document.addEventListener('DOMContentLoaded', function() {

    let map = L.map('addressMap').setView([55.751244, 37.618423], 10); 
    let marker = null;
    let addressInput = document.getElementById('address');
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    map.on('click', function(e) {
        if (marker) {
            map.removeLayer(marker);
        }
        
        marker = L.marker(e.latlng).addTo(map)
            .bindPopup("Ваш адрес будет определен здесь")
            .openPopup();
  
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
            .then(response => response.json())
            .then(data => {
                const address = data.display_name || 'Адрес не определен';
                addressInput.value = address;
                if (marker) {
                    marker.setPopupContent(address);
                }
            })
            .catch(error => {
                console.error('Ошибка определения адреса:', error);
                addressInput.value = 'Адрес не определен';
            });
    });
    
    // Определить мое местоположение
    document.getElementById('locateMeBtn').addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const latlng = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    map.setView(latlng, 15);
                    
                    if (marker) {
                        map.removeLayer(marker);
                    }
                    
                    marker = L.marker(latlng).addTo(map)
                        .bindPopup("Ваше текущее местоположение")
                        .openPopup();
                    
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
                        .then(response => response.json())
                        .then(data => {
                            addressInput.value = data.display_name || 'Адрес не определен';
                            if (marker) {
                                marker.setPopupContent(data.display_name || 'Ваше местоположение');
                            }
                        });
                },
                function(error) {
                    alert('Не удалось определить ваше местоположение: ' + error.message);
                }
            );
        } else {
            alert('Геолокация не поддерживается вашим браузером');
        }
    });
    
    //Сбросить метку
    document.getElementById('resetMapBtn').addEventListener('click', function() {
        if (marker) {
            map.removeLayer(marker);
            marker = null;
        }
        addressInput.value = '';
    });
});

document.querySelector('.application-form').addEventListener('submit', function(e) {
    e.preventDefault(); 
    

    if (!document.getElementById('address').value) {
        alert('Пожалуйста, укажите ваш адрес на карте');
        return;
    }

    alert('Ваша анкета отправлена на рассмотрение. Мы свяжемся с вами в ближайшее время!');
    


    this.reset();
    if (marker) {
        map.removeLayer(marker);
        marker = null;
    }
});
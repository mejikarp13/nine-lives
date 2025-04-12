document.addEventListener('DOMContentLoaded', function() {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const catCards = document.querySelectorAll('.cat-card');
    const showMoreBtn = document.querySelector('.show-more-btn');
    const showMoreContainer = document.querySelector('.show-more-container');
    

    let visibleCount = 3; 
    let currentFilter = 'all'; 

    function updateDisplay() {
        let shownCount = 0;
        let hasHidden = false;
        
        catCards.forEach(card => {
            const gender = card.dataset.gender;
            const age = card.dataset.age;
            const isHiddenClass = card.classList.contains('hidden-cat');
            
            const matchesFilter = 
                currentFilter === 'all' || 
                (currentFilter === 'female' && gender === 'female') || 
                (currentFilter === 'male' && gender === 'male') ||
                (currentFilter === 'kitten' && age === 'kitten');
            

            if (matchesFilter) {

                if (shownCount < visibleCount || !isHiddenClass) {
                    card.style.display = 'block';
                    shownCount++;
                } else {
                    card.style.display = 'none';
                    hasHidden = true;
                }
            } else {
                card.style.display = 'none';
            }
        });
   
        if (hasHidden) {
            showMoreContainer.style.display = 'block';
        } else {
            showMoreContainer.style.display = 'none';
        }
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
       
            currentFilter = this.dataset.filter;
            visibleCount = 3;
            

            updateDisplay();
        });
    });

    showMoreBtn.addEventListener('click', function() {
 
        visibleCount += 3;
        updateDisplay();
    });
    

    updateDisplay();
});


    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    });


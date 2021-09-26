const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active-style')) {
                this.classList.remove('active-style');
                this.nextElementSibling.classList.remove('active-content');
                this.nextElementSibling.style.maxHeight = '0px';
            } else {
                btns.forEach(btn => {
                    btn.classList.remove('active-style');
                    btn.nextElementSibling.classList.remove('active-content');
                    btn.nextElementSibling.style.maxHeight = '0px';
                });
                this.classList.add('active-style');
                this.nextElementSibling.classList.add('active-content');

                if (this.classList.contains('active-style')) {
                    this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';

                } else {
                    this.nextElementSibling.style.maxHeight = '0px';
                }

            }

        });
    });



    //     blocks = document.querySelectorAll(itemsSelector);

    // blocks.forEach(block => {
    //     block.classList.add('animated', 'fadeInDown');
    // });

    // btns.forEach(btn => {
    //     btn.addEventListener('click', (e) => {
    //         if (!e.classList.contains('active')) {
    //             btns.forEach(btn => {
    //                 btn.classList.remove('active', 'active-style');
    //             });
    //             e.classList.add('active', 'active-style');
    //             console.log(' works');
    //         }
    //     });
    // });


};

export default accordion;
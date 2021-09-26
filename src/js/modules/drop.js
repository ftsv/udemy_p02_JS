import {
    postData,
    getResource
} from '../services/requests';

const drop = () => {
    //dragenter - объект над dropArea
    //dragleave - объект за пределами dropArea
    //dragover - объект зависает над dropArea
    //drop - объект упал в dropArea
    const fileInputs = document.querySelectorAll('[name="upload"]');
    const {
        log
    } = console;

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0, 0, 0, .7)';
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = 'none';

        if (item.closest('.calc-form')) {
            item.closest('.file_upload').style.backgroundColor = '#fff';
        } else {
            item.closest('.file_upload').style.backgroundColor = '#ededed';
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            const arr = input.files[0].name.split('.');


            arr[0].lenght > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
            // Добавить отправку файла после drop события
            postData('assets/server.php', input.files[0])
                .then(res => log(res));
            // log(input.files[0]);
            // getResource('assets/server.php')
            //     .then(res => log(res));

        });
    });

};

export default drop;
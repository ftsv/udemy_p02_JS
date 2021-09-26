import {
    postData,
    getResource
} from '../services/requests';

const makeOrder = (trigger) => {
    const btn = document.getElementById(trigger);
    const sizeBlock = document.querySelectorAll('#size'),
        materialBlock = document.querySelectorAll('#material'),
        optionsBlock = document.querySelectorAll('#options'),
        promocodeBlock = document.querySelectorAll('.promocode');

    async function getDataFromServer() {

        getResource('assets/db.json')
            .then(res => {
                bindActionToElems('change', sizeBlock, 'size', res);
                bindActionToElems('change', materialBlock, 'material', res);
                bindActionToElems('change', optionsBlock, 'options', res);
                bindActionToElems('input', promocodeBlock, 'promocode', res);
            })
            .catch(error => console.log(error));
        let orderRequest = {};

        function bindActionToElems(event, elem, prop, res) {
            const orderOptions = res.orders;
            elem.forEach((item) => {
                item.addEventListener(event, () => {
                    switch (event) {
                        case 'change':
                            orderRequest[prop] = orderOptions[prop][item.value];
                            break;

                        case 'input':
                            orderRequest[prop] = item.value;
                            break;

                    }
                    console.log(orderRequest);
                });


            });
        }
        btn.onclick = () => {
            postData('assets/server.php', orderRequest);
        };

    }


    getDataFromServer();
};

export default makeOrder;
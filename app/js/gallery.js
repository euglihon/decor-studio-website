const img = document.querySelectorAll('.gallery__img');
const btn = document.querySelectorAll('.gallery__btn');

let numberBtn;


for (let i = 0; i < btn.length; i++) {

  btn[i].addEventListener('click', () => {

    numberBtn = btn[i].dataset.number;

    if (btn[i].dataset.number == numberBtn) {

      for (let i = 0; i < img.length; i++) {
        if (btn[i].dataset.number == numberBtn) {
          img[i].style.display = 'none';
          btn[i].style.outline = 'none';
        }
      }
      img[i].style.display = 'block';
      btn[i].style.outline = '2px solid #00accc';
    }
  });
}



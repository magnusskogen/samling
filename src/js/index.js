import { gsap } from "gsap";
import serialize from "form-serialize";



const accordionContent = document.querySelectorAll('.js-accordion-content');
if (accordionContent) {
  accordionContent.forEach(function(el){
    el.dataset.height = el.offsetHeight;
    el.style.height = 0;
    el.style.opacity = 0;
  });
}



const accordionLinks = document.querySelectorAll('.js-accordion-link');
if (accordionLinks) {
  accordionLinks.forEach(function(el){
    el.addEventListener('click', function(e){
      e.preventDefault();
      var content = el.parentElement.querySelector('.js-accordion-content');
      if (el.classList.contains('active')) {
        gsap.to(content, { height: 0, opacity: 0, duration: .25 });
      } else {
        gsap.to(content, { height: content.dataset.height, opacity: 1, duration: .25 });
      }
      el.classList.toggle('active');
      if (content.querySelector('.js-inner-content')) {
        const accordionContent = content.querySelectorAll('.js-inner-content');
        accordionContent.forEach(function(newInner){
            newInner.classList.remove('hidden');
            newInner.removeAttribute('style');

            newInner.dataset.height = newInner.offsetHeight;
            newInner.style.height = 0;
            newInner.style.opacity = 0;
            const innerAccordionLink = newInner.parentElement.querySelector('.js-inner-link');
            innerAccordionLink.addEventListener('click', function(e){
                e.preventDefault();
                content.style.height = 'auto';
                if (innerAccordionLink.classList.contains('active')) {
                    gsap.to(newInner, { height: 0, opacity: 0, duration: .25 });
                } else {
                    gsap.to(newInner, { height: newInner.dataset.height, opacity: 1, duration: .25    });
                }
                innerAccordionLink.classList.toggle('active');

            });
        });
        
        

        
        }
      });
    })
  }



  console.log("heia");

  const ajaxShopify = {};

  ajaxShopify.onCartUpdate = cart => {
    console.log("items in the cart?", cart.item_count);
  };

  ajaxShopify.addItemFromForm = form => {
    form = serialize(form, { hash: true });
    fetch("/cart/add.js", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        /* we have JSON */
        console.log(json);
        updateCart();
      })
      .catch(function(err) {
        /* uh oh, we have error. */
        console.error(err);
      });
  };

  document
    .querySelector(".js-form-add-to-cart")
    .addEventListener("submit", e => {
      e.preventDefault();
      console.log(e.target);
      ajaxShopify.addItemFromForm(e.target);
    });

  const updateCart = cart => {
    fetch("/cart.js", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log(json);
        document.getElementById('cart-count').innerHTML = json.item_count;
        var spinActive = document.querySelector('.js-spin.active');
        spinActive.classList.remove('active');
        spinActive.classList.add('hidden');
        spinActive.parentElement.querySelector('.js-ok').classList.remove('hidden');


      });
  };

  const cartUpdateCallback = cart => {
    updateCount(cart);
    ajaxShopify.onCartUpdate(cart);
  };

  document.querySelectorAll('.js-add-to-cart').forEach(function(el){
      el.addEventListener('click', function(){
          var id = el.id;
          console.log(id);
          var label = document.querySelector('.label-' + id);
          console.log(label);
          label.querySelector('.js-cart').classList.add('hidden');
          label.querySelector('.js-ok').classList.add('hidden');
          label.querySelector('.js-spin').classList.remove('hidden');
          label.querySelector('.js-spin').classList.add('active');
          ajaxShopify.addItemFromForm(el.parentElement);

      })

  });


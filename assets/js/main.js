/*  */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Muestra menu */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Oculta menu */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* Remueve el menu para MOBILE */
// ! Corregir problema en el que se muestra encimado los links-NavBar */
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* BACKGROUND Header */
// ! Oscurecer desde un iniciol */
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('bg-header') 
                    : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/* Secciones activas */
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
    const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			sectionTop = current.offsetTop - 58,
			sectionId = current.getAttribute('id'),
			sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)



/* ___________________________________ Animaciones de SCROLL REVEAL */
// ! Ajustar velocidad
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 400,
})

sr.reveal(`.home__data, .footer__container, .footer__group`)
sr.reveal(`.home__img`, {delay: 700, origin: 'bottom'})
sr.reveal(`.logos__img, .program__card, .pricing__card`, {interval: 100})
sr.reveal(`.choose__img, .calculate__content`, {origin: 'left'})
sr.reveal(`.choose__content, .calculate__img`, {origin: 'right'})

/* ___________________________________ Calculadora */
// ! Checar que al introducir varios valores seguidamente no ocurra un error
const calculateForm = document.getElementById('calculate-form'),
    calculateCm = document.getElementById('calculate-cm'),
    calculateKg = document.getElementById('calculate-kg'),
    calculateMessage = document.getElementById('calculate-message')

const calculateBmi = (e) =>{
    e.preventDefault()

    // Validar si hay dato
    if(calculateCm.value === '' || calculateKg.value === ''){
        // !
        calculateMessage.classList.remove('color-green')
        calculateMessage.classList.add('color-red')

        // En caso de que no haya valor
        calculateMessage.textContent = 'Introduce tu altura y tu peso'

        // Eliminamos el mensaje en 3 segundo
        setTimeout(() =>{
            calculateMessage.textContent = ''
        }, 3000)
    } else{
        // Formula principal
        const cm = calculateCm.value / 100,
            kg = calculateKg.value,
            bmi = Math.round(kg / (cm * cm))

        // Estado de salud
        if(bmi < 18.5){
            // Agregar color y estado de salud
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Tu IMC es ${bmi} y Eres delgad@`
        } else if(bmi < 25){
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Tu IMC es ${bmi} y tu estas san@`
        } else{
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Tu IMC es ${bmi} y tienes sobrepeso`
        }

        // Elimina el input fallido
        calculateCm.value = ''
        calculateKg.value = ''

        // Remueve mensaje
        setTimeout(() =>{
            calculateMessage.textContent = ''
        }, 10000)
    }
}

calculateForm.addEventListener('submit', calculateBmi)

/* ___________________________________ EMAIL */
// ! Agregar Email correctamente

/* const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message'),
    contactUser = document.getElementById('contact-user') */

const sendEmail = (e) =>{
    e.preventDefault()

    // Validacion 1
    if(contactUser.value === ''){
        // Añade color y
        contactMessage.classList.remove('color-green')
        contactMessage.classList.add('color-red')

        // Muestra mensaje
        contactMessage.textContent = '   Mensaje-01'

        // Elimina mensaje
/*         setTimeout(() =>{
            contactMessage.textContent = ''
        }, 3000) */
    } else{

        emailjs.sendForm('service_pdnta79')
            .then(() =>{
                // Show message and add color
/*                 contactMessage.classList.add('color-green')
                contactMessage.textContent = 'You registered successfully' */

                // ! Ajustar velocidad */
                setTimeout(() =>{
                    contactMessage.textContent = ''
                }, 3000)
            }, (error) =>{
                /*  */
                // alert('Algo salió mal...', error)
            })

/*         contactUser.value = '' */
    }
}

/* contactForm.addEventListener('submit', sendEmail) */
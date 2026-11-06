// Permite que el CSS oculte los elementos .reveal solo cuando hay JavaScript
document.documentElement.classList.add('js');

$(document).ready(function () {
    $(document).on("scroll", onScroll);

    // Aparición al hacer scroll
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        $('.reveal').each(function () {
            observer.observe(this);
        });
    } else {
        $('.reveal').addClass('visible');
    }

    // Imagen ampliada del portafolio
    $('#portfolio .box img').on('click', function () {
        $('#modal-img').attr({ src: this.src, alt: $(this).siblings('h3').text() });
        $('#modal-caption').text($(this).siblings('h3').text());
        $('#modal').prop('hidden', false);
    });

    $('#modal').on('click', function (e) {
        if (e.target !== document.getElementById('modal-img')) {
            $('#modal').prop('hidden', true);
        }
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            $('#modal').prop('hidden', true);
        }
    });

    $('nav a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('nav a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash;
        $target = $(target);
        // Deja el título de la sección visible debajo del menú fijo
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - $('header').outerHeight() + 2
        }, 500, 'swing', function () {
            history.replaceState(null, '', target);
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event) {
    // Cuenta el menú fijo y la altura completa de cada sección (con su padding)
    var scrollPosition = $(document).scrollTop() + $('header').outerHeight();
    $('nav a').each(function () {
        var currentLink = $(this);
        var refElement = $(currentLink.attr("href"));
        var top = refElement.offset().top;
        if (top <= scrollPosition && top + refElement.outerHeight() > scrollPosition) {
            $('nav a').removeClass("active");
            currentLink.addClass("active");
        }
        else {
            currentLink.removeClass("active");
        }
    });

    // Al final de la página la última sección no alcanza el menú: se marca su enlace
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 2) {
        $('nav a').removeClass("active");
        $('nav a').last().addClass("active");
    }
}
/*
  MiniMo FrameWork

    MiniMo

      Menu

        DropDown
        TabDown
*/

// MiniMo

  // <Menu>

    // DropDown

      $.fn.MenuDropDown = function(arg)
      {
        if(isNaN(arg))
        {
          var time = 175; //  Valor padrão
        }

        if(arg == 'fixed')
        {  
          $(window).scroll(function (event) 
          {
            if ($(this).scrollTop() > 0) 
            {
              $('.MiniMoMenuDropDown').addClass('MiniMoFeatFixed');
            } 
            else 
            {
              $('.MiniMoMenuDropDown').removeClass('MiniMoFeatFixed');
            }
          });
        }

        $(this).addClass('MiniMoMenuDropDown');

        $(this).find('li').hover(function() 
        {
          $(this).find('ul:first,ol:first').slideDown(time);
        },
        function() 
        {
          $(this).find('ul,ol').slideUp(time);
        });
      }

    // TabDown

      $.fn.MenuTabDown = function(arg)
      {
        if(arg == 'fixed')
        {  
          $(window).scroll(function (event) 
          {
            if ($(this).scrollTop() > 0) 
            {
              $('.MiniMoMenuTabDown').addClass('MiniMoFeatFixed');
            } 
            else 
            {
              $('.MiniMoMenuTabDown').removeClass('MiniMoFeatFixed');
            }
          });
        }

        $(this).addClass('MiniMoMenuTabDown');

        $('.MiniMoMenuTabDown ul').hide();

        $('.MiniMoMenuTabDown h1').click(function() 
        {
          var $this = $(this);

          if ($this.hasClass("clicked-once")) 
          {
            $this.toggleClass("clicked-once");
            $('.MiniMoMenuTabDown ul').slideUp(175);
          }
          else 
          {
            $this.toggleClass("clicked-once");
            $('.MiniMoMenuTabDown ul').slideDown(175);
          }
        });
      }

  // </Menu>

  // ImgSlider

    $.fn.Slider = function(nav, intNav, time)
    {
      /*
        ImgsSlider Setup
          
          Variável 'thisSlider' recebe o elemento 'this'
          Retorna o atributo 'src' das imagens dentro de elemento 'this' e o armazena no arra 'imgsArr'.
          Adiciona a classe 'MiniMoSlider' ao elemento 'this'.
          Adiciona um elemento <div> com a classe 'MiniMoSliderTemp' no início do elemento 'this'.
          Envolve cada elemento <img> dentro do elemento 'this' com um elemento <figure>.
          Adiciona um elemento <figvaption> a cada elemento <figure> dentro do elemento 'this'.
          Atribui o texto do elemento <span> na posição 'i' ao elemento <figcaption> na posição 'i'.
          Remove os elementos <span> do elemento 'this'.

          Se o parâmetro 'time' não estiver configurado, ele recebe o valor 5000 (milisegundos).
          Se o parâmetro 'time' receber a string "stop", ele recebe um grande valor.
          Se o parâmetro 'nav' receber a string "mainNav", o elemento 'this' recebe um elemento <button> com as classes 'MiniMoSliderArrowButton' e 'Left' e um elemento <button> com as classes 'MiniMoSliderArrowButton' e 'Right'.
          Se o parâmetro 'intNav' receber a string "internalNav", o elemento 'this' recebe um elemento <div> com a classe 'MiniMoSliderNav' e este elemento recebe um elemento <button> com a classe 'MiniMoSliderNavButton' para cada imagem dentro do elemento 'this'

          Variável 'i' recebe o valor 0.
          O atributo 'background-image' do elemento 'this' recebe a imagem armazenada no array 'imgsArr' na posição 'i'.
          O atributo 'background-image' do elemento com a classe 'MiniMoSliderTemp' do elemento 'this' recebe o valor do atributo 'background-image' do elemento 'this'.
          O elemento <figcaption> do elemento 'this' é apresentado com a função 'FadeIn()' num intervalo de 1000 milisegundos.
      */

      // Slider Setup

        var thisSlider = $(this);

        var imgsArr = thisSlider.find('img').map(function() 
        {
          return $(this).attr('src');
        }).get();

        thisSlider.addClass('MiniMoSlider');

        thisSlider.prepend('<div class="MiniMoSliderTemp"></div>');

        thisSlider.find('img').wrap('<figure class="MiniMoSliderFigure"></figure>');

        thisSlider.find('figure').append('<figcaption class="MiniMoSliderFigureFigcaption"></figcaption>');

        for (var i = 0; i < imgsArr.length; i++)
        {
          thisSlider.find(".MiniMoSliderFigureFigcaption:eq("+i+")").append(thisSlider.find("span:eq("+i+")").text());
        };

        thisSlider.find('span').remove(); 

        if (time == undefined) 
          {
            time = 5000;
          };

        if (time == "stop") 
        {
          time = 999999999;
        };

        if (nav == "arrowNav") 
        {
          thisSlider.append('<button class="MiniMoSliderArrowButton Left"></button>');
          thisSlider.append('<button class="MiniMoSliderArrowButton Right"></button>');
        }

        if (intNav == "indexNav") 
        {
          thisSlider.append('<div class="MiniMoSliderNav"></div>');
          
          for (var i = 0; i < imgsArr.length; i++) 
          {
            thisSlider.find(".MiniMoSliderNav").append('<button class="MiniMoSliderNavButton"></button>');
          }
        }

        var i = 0;

        thisSlider.css('background-image', 'url('+imgsArr[i]+')');

        thisSlider.find(".MiniMoSliderTemp").css('background-image', thisSlider.css('background-image'));

        thisSlider.find(".MiniMoSliderFigureFigcaption:eq("+i+")").fadeIn(1000);

        thisSlider.find(".MiniMoSliderNavButton:eq("+i+")").addClass('Selected');

      // Slider Transition Timer

        function sliderTransition()
        {
          thisSlider.css('background-image', thisSlider.find(".MiniMoSliderTemp").css('background-image'));
          thisSlider.find(".MiniMoSliderTemp").hide().css('background-image','url('+imgsArr[i]+')').fadeIn(1000);
          
          thisSlider.find(".MiniMoSliderNavButton").removeClass('Selected');
          thisSlider.find(".MiniMoSliderNavButton:eq("+i+")").addClass('Selected');

          thisSlider.find(".MiniMoSliderFigureFigcaption:eq("+i+")").fadeIn(1000);
        }

        var timer = setInterval(function()
        {
          thisSlider.find(".MiniMoSliderFigureFigcaption:eq("+i+")").hide();

          i = i + 1;
          if (i >= imgsArr.length) 
          {
            i = 0;
          }
          if (i < 0) 
          {
            i = imgsArr.length - 1;
          }

          sliderTransition();

        },time);

      // Slider Right Button

        thisSlider.find(".Right").click(function() 
        {
          thisSlider.find(".MiniMoSliderFigureFigcaption:eq("+i+")").hide();

          clearInterval(timer);

          i = i + 1;

          if (i >= imgsArr.length) 
          {
            i = 0;
          }

          sliderTransition();

          timer = setInterval(function()
          {
            thisSlider.find(".MiniMoSliderFigureFigcaption:eq("+i+")").hide();

            i = i + 1;
            if (i >= imgsArr.length) 
            {
              i = 0;
            };
            if (i < 0) 
            {
              i = imgsArr.length - 1;
            };

            sliderTransition();

          },time);
        });

      // Slider Left Button

        thisSlider.find(".Left").click(function() 
        {
          thisSlider.find(".MiniMoSliderFigureFigcaption:eq("+i+")").hide();

          clearInterval(timer);

          i = i - 1;

          if (i < 0) 
          {
            i = imgsArr.length - 1;
          };

          sliderTransition();

          timer = setInterval(function()
          {
            thisSlider.find(".MiniMoSliderFigureFigcaption:eq("+i+")").hide();

            i = i + 1;
            if (i >= imgsArr.length) 
            {
              i = 0;
            };
            if (i < 0) 
            {
              i = imgsArr.length - 1;
            };

            sliderTransition();

          },time);
        });

      // Slider Internal Nav

      thisSlider.find(".MiniMoSliderNavButton").click(function() 
      {
        thisSlider.find(".MiniMoSliderNavButton").removeClass('Selected');
        $(this).addClass('Selected');
        thisSlider.find(".MiniMoSliderFigureFigcaption:eq("+i+")").hide();

        clearInterval(timer);

        i = $(this).index();

        sliderTransition();

        timer = setInterval(function()
        {
          thisSlider.find(".MiniMoSliderFigureFigcaption:eq("+i+")").hide();

          i = i + 1;
          if (i >= imgsArr.length) 
          {
            i = 0;
          };
          if (i < 0) 
          {
            i = imgsArr.length - 1;
          };

          sliderTransition();

        },time);
      });
    }
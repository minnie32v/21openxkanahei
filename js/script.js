

$(function(){
    // loading
      window.onload = function(){
        $('.loading').hide();
           
     };
    //延後載入畫面外圖片
    // $('.lazy').lazy({
    //     effect: 'fadeIn'
    // });

    var $menntop=$('.menu').offset().top;
    // console.log($menntop);

    $(window).scroll(function(){
        // console.log($('.menu').offset().top);
        $(window).scrollTop()>$menntop ? ($('.menu').addClass('scrollfixed')):( $('.menu').removeClass('scrollfixed')); 
    });

     // ( $('.menu').removeClass('scrollfixed'))


    //header /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('header').load('common.html .header-container', function(){
       
        var header = $('header'),
            nav = $('nav'),
            navCheck = $('.navCheck'),
            navA = $('nav a');

        //LOGO 圖
        header.find('.logo').load('images/logo.svg', function(){
        });


        //檢查選單高度
        function headerHeight(){
            var headerH = header.height();

            // 漢堡選單有無被點擊
            navCheck.on('change' , function() { 
                if (navCheck.is(":checked")) {  //漢堡選單打開
                    nav.css({'height':'100%' });
                    // nav.css({'height':'calc(100% - ' + headerH + 'px)' });
                    $('html').addClass('fixed');
                    $('body').css('margin-top','');
                } else { //漢堡選單關閉
                    nav.css({'height':''});
                    $('html').removeClass('fixed');
                    // $('body').css('margin-top',headerH);
                }
            }).change();
        }
        headerHeight();

        // 點選單連結後關閉選單，把 header 隱藏
        navA.on('click',function(){
            navCheck.click();
            headerSrc();
               $('.product-slid').slick('slickGoTo', 0);
            
        });



        //頁面滑動時，TOP的變化
        var previousScroll = 0;
        function headerSrc(){
            header.removeClass('hide');
            var theEnd = $(document).height()-$(window).height()-100; //內容到底時
            var currentScroll = $(this).scrollTop(); //偵測滑鼠行為
            if( currentScroll == 0 ){
                $('.fixed-box').addClass('hide');
                $('.stickers-scroll').removeClass('active');
                $('.stickers-scroll').removeClass('hasbottom');
            }
            if( currentScroll < 600 ){
                $('.fixed-box').addClass('hide');
            }
            if( currentScroll < previousScroll) {
                // console.log("123");
                header.stop().removeClass('hide');//如果頁面往上顯示選單
                $('.tabs').addClass('hastop');//如果頁面往上顯示tab會往下57px
                $('.fixed-box').removeClass('hasbottom');
            } 
            if( currentScroll > previousScroll) {
                if( currentScroll < 150){
                    header.stop().removeClass('hide');
                }else{
                    header.stop().addClass('hide'); //如果頁面往下隱藏選單
                    $('.tabs').removeClass('hastop');
                    $('.fixed-box').removeClass('hide');
                }
            }
            if( $(window).scrollTop()>=theEnd ){
                header.stop().delay(500).removeClass('hide'); //如果頁面到底顯示選單
                $('.stickers-scroll').addClass('hasbottom');
                $('.stickers-scroll').removeClass('active');
                $('.fixed-box').addClass('hasbottom');

            }
            
            

            previousScroll = currentScroll;
        }
        $(window).on('load scroll' ,function(){
            headerSrc();
            if ($(window).width() > 1200){               
            }
        });

        //卷軸樣式
        $('.mainMenu-box').mCustomScrollbar();
       
    });




    // 選單錨點＋連結
    $('.menu>div').on('click',function(){
        
        var _index=$(this).index()+1;
        // $('html,body').stop().animate({scrollTop:$('.l-survey').offset().top},1000,$.bez([.23,1,.32,1]));
        
        
        if($(window).scrollTop()==0){
            switch ( _index ){
                case 1:
                    $('html,body').stop().animate({scrollTop:$('.l-card').offset().top},600,$.bez([.23,1,.32,1]));
                    break;
                case 3:
                    $('html,body').stop().animate({scrollTop:$('.l-discount').offset().top-120},800,$.bez([.23,1,.32,1]));
                    break;
                case 5:
                    $('html,body').stop().animate({scrollTop:$('.l-easytake').offset().top-120},1000,$.bez([.23,1,.32,1]));
                    break;
                case 7:
                    $('html,body').stop().animate({scrollTop:$('.l-ideamaker').offset().top-120},1200,$.bez([.23,1,.32,1]));              
                    break;
                case 9:
                    $('html,body').stop().animate({scrollTop:$('.l-store').offset().top-120},1400,$.bez([.23,1,.32,1]));               
                    break;
                case 11:
                    $('html,body').stop().animate({scrollTop:$('.l-notice').offset().top-120},1600,$.bez([.23,1,.32,1]));               
                    break;
            }  

        }else{
            switch ( _index ){
                case 1:
                    $('html,body').stop().animate({scrollTop:$('.l-card').offset().top},600,$.bez([.23,1,.32,1]));
                    break;
                case 3:
                    $('html,body').stop().animate({scrollTop:$('.l-discount').offset().top-60},800,$.bez([.23,1,.32,1]));
                    break;
                case 5:
                    $('html,body').stop().animate({scrollTop:$('.l-easytake').offset().top-60},1000,$.bez([.23,1,.32,1]));
                    break;
                case 7:
                    $('html,body').stop().animate({scrollTop:$('.l-ideamaker').offset().top-60},1200,$.bez([.23,1,.32,1]));              
                    break;
                case 9:
                    $('html,body').stop().animate({scrollTop:$('.l-store').offset().top-60},1400,$.bez([.23,1,.32,1]));               
                    break;
                case 11:
                    $('html,body').stop().animate({scrollTop:$('.l-notice').offset().top-60},1600,$.bez([.23,1,.32,1]));               
                    break;
            }  
        }
        
    });
    // 選單錨點＋連結 end

    // tab功能
    // tab change
    $('.tab-content.L1>div[id!="tab01"]').hide();
    $('.tab-content.L2>div[id!="tab01"]').hide();

    $('.tab-menu.L1>li').on('click',function(e){
        e.preventDefault();
        var i=$(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        var _target=$(this).find('a').attr('href');
        $('.tab-content.L1>div').hide();
        $('.tab-content.L1>'+_target).show();

        var productTab = $(this).find("a").data('tab');
        console.log(productTab);
        callslick(productTab);

        return false;
    }).eq(0).click();

    $('.tab-menu.L2>li').on('click',function(e){
        e.preventDefault();
        var productTab = $(this).find("a").data('tab');
        $(this).addClass('active').siblings().removeClass('active');
        var _target=$(this).find('a').attr('href');
        $(this).parent().next().children().hide();
        $(this).parent().next().children(_target).show();
        callslick(productTab);
        return false;
    });

    // 需手動增加
    $('.L1 #tab01 .tab-menu>li').eq(0).click();
    $('.L1 #tab02 .tab-menu>li').eq(0).click();
    $('.L1 #tab03 .tab-menu>li').eq(0).click();

    // 利用hash變數抓取網址後面那段來判斷是不是外連過來
    var hash = location.hash.substring(1, location.hash.length);
            if(hash=='tab02'){ //=等於0不是外連過來
            urlclik();
        }

    function urlclik(){
        $('html,body').stop().animate({scrollTop:$('#s2').offset().top-60},1000,$.bez([.23,1,.32,1]));
        $('.tab-menu.L1>li').eq(1).click();
    }

    
  


   //footer /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('footer').load('common.html .footer-container', function(){
        //按鈕 TOP
        $('.btn-top').click(function() {
            $('html,body').animate({scrollTop:0},900)
        })
    });

    function callslick(target){
        // 初始化
		if($('.product-slide-' + target).hasClass('slick-initialized')) {
			$('.product-slide-' + target).slick("unslick");
			// console.log("unslick");
		}

        $('.product-slide-' + target).slick({       
            arrows:true,
            dots:false,
            slidesToShow:5,
            rows:2,
            swipeToSlide: true,
            infinite:true,
            cssEase:'ease-in-out',
            responsive: [
                {
                breakpoint:1200,
                settings: {
                    slidesToShow:3,
                }
                },
                {
                breakpoint:768,
                settings:{
                    slidesToShow:2,
                    rows:2,
                }
                }
            ]
        });
    }



});


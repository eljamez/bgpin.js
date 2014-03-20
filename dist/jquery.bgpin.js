// jquery.bgpin.js
// Background Fixing with scrolling foregrounds.

(function($){
  jQuery.fn.bgpin = function(options){

    // check and set mobile var
    if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) isMobile = true;

    if(isMobile === true){
      console.log('mobile');
      $('.bgpin-single').css({'height':'100%'});
    } else {
      //$('.bgpin-single').css({'height':'100vh'});
      //this.css({'height':(bgpin_count * 100)+'%'});
    }

    // set variables
    var opts = $.extend({}, $.fn.bgpin.defaults, options),
          $window = $(window),
          $this = this,
          bgpin_count = $this.find('.bgpin-single').length,
          bgpin_info_each = {},
          scroll_top,
          $bg_to_fade,
          holder_top_offset = $this.offset(),
          holder_top = Math.round(holder_top_offset.top),
          holder_bottom = holder_top + $this.outerHeight(),
          last_bg = $this.find('.bgpin-single:last-of-type'),
          last_bg_offset = last_bg.offset(),
          last_bg_top = Math.round(last_bg_offset.top),
          bg_image_css = '',
          new_bg_html = '',
          switch_scroll_position_check = Math.round($window.outerHeight()/2),
          isMobile = false,
          top_and_bottoms = [],
          last_showing_bg = 0,
          current_showing_bg = 1;

    // set the switch align
    if(opts.switchAlign === 'top') switch_scroll_position_check = 0;
    if(opts.switchAlign === 'middle') switch_scroll_position_check -= $('.bgpin-single-content').outerHeight(true)/2;

    // loop through each pinned group
    if(isMobile === false){
      $.each($this.find('.bgpin-single'), function(key, val){
        var this_val_offset = $(val).offset()
        bgpin_info_each[key] = {'background_image':$(val).css('background-image'),'tops':Math.round(this_val_offset.top)};
        $(val).css({'background-image':'none','z-index':bgpin_count+10});
      });
    }

    // new each
    $.each(bgpin_info_each, function(key2,value) {
      if(isMobile === false){
        bg_image_css = "background-size: cover; height: 100vh; position: absolute; top:0; width:100%;"
      } else {
        bg_image_css = "background-size: cover; height: 100%; position: absolute; top:0; width:100%;"
      }
      var z_index = bgpin_count+(bgpin_count - key2);
      new_bg_html += "<div class='background_imgs background_imgs-"+(parseInt(key2)+1)+"' style='background-image: "+value['background_image']+"; z-index:"+z_index+";"+bg_image_css+"'></div>\n";
    });

    // append new bg after it's all set
    $this.append(new_bg_html);

    // get the background info
    if(isMobile === false){
      $.each($('.background_imgs'), function(key, value){
        if(bgpin_info_each[key] !== undefined) {
          in_the_bottom_check = ((!!bgpin_info_each[key+1]) ? bgpin_info_each[key+1]['tops'] - switch_scroll_position_check : holder_bottom);
          top_and_bottoms[key] = {
            'top_check': parseInt(bgpin_info_each[key]['tops']) - parseInt(switch_scroll_position_check),
            'bottom_check': in_the_bottom_check
          }
        }
      });
    }

    // checking the scrolling biz 
    if(isMobile === false){
      $window.scroll(function(){
        scroll_top = $window.scrollTop();
        // keep it fixed when in fixed area
        if(scroll_top >= holder_top && scroll_top < last_bg_top) {
          $('.background_imgs').css({'position': 'fixed'});
          if(scroll_top >= last_bg_top - switch_scroll_position_check && scroll_top < holder_bottom) {
            $('.background_imgs').addClass('bg-hidden');
          }
        } else {
          $('.background_imgs').css({'position': 'absolute'});
          // set the bottom 2 to stay at the botom.
          $('.background_imgs-'+(bgpin_count-1)).css({'bottom':0,'top':'auto'});
          $('.background_imgs-'+bgpin_count).css({'bottom':0,'top':'auto'});
        }
        // fade the sections in and out
        $.each(top_and_bottoms, function(key,value) {
          if(scroll_top >= value.top_check && scroll_top < value.bottom_check) {
            last_showing_bg = current_showing_bg;
            if(current_showing_bg != key+1){
              last_showing_bg = current_showing_bg;
              current_showing_bg = parseInt(key+1);
              // hide last
              bg_fade('out', $('.background_imgs-'+last_showing_bg));
              bg_fade('in', $('.background_imgs-'+current_showing_bg));
            }
          }
        });
      });
    }
/*
    if(isMobile === true){
      $window.on('touchstart', function() {
        scroll_top = $window.scrollTop();
        console.log('START');
        console.log(scroll_top, 'is the scroll top');
      })
    }

    if(isMobile === true){
      $window.on('touchend', function() {
        console.log('END');
        console.log(scroll_top, 'is the scroll top');
      })
    }


    var scrollTime = false;
    afterScroll = function() {
      scroll_top = $window.scrollTop();
      console.log('scrollend, timeouts',scroll_top);
    }

    // for mobile
    if(isMobile === true){
      $window.on('touchmove', function(e) { 
        scroll_top = $window.scrollTop();
        holder_top_offset = $this.offset(),
        holder_top = Math.round(holder_top_offset.top),
        last_bg_offset = last_bg.offset();
        last_bg_top = Math.round(last_bg_offset.top);
        console.log('-------scroll top and last_bg_top-------');
        console.log(scroll_top,'scroll top');
        console.log(last_bg_top,'last bg top');
        console.log(holder_top,'holder top');
        if(scroll_top >= holder_top && scroll_top < last_bg_top) {
          console.log('--------------------');
          console.log('this should be fixed bg');
          $('.background_imgs').css({'position': 'fixed'});
          if(scroll_top >= last_bg_top - switch_scroll_position_check && scroll_top < holder_bottom) {
            $('.background_imgs').addClass('bg-hidden');
          }
        } else {
          $('.background_imgs').css({'position': 'absolute'});
          $('.background_imgs-'+bgpin_count).css({'bottom':0,'top':'auto'});
        }
                // fade the sections in and out
        $.each(top_and_bottoms, function(key,value) {
          if(scroll_top >= value.top_check && scroll_top < value.bottom_check) {
            last_showing_bg = current_showing_bg;
            if(current_showing_bg != key+1){
              last_showing_bg = current_showing_bg;
              current_showing_bg = parseInt(key+1);
              // hide last
              bg_fade('out', $('.background_imgs-'+last_showing_bg));
              bg_fade('in', $('.background_imgs-'+current_showing_bg));
            }
          }
        });
        if (scrollTime) {
          clearTimeout(scrollTime);
        }
        scrollTime = setTimeout(afterScroll, 100);
      });
    }
    */



    //// individual background scroll checking
    //$.each($('.background_imgs'), function(key, value){
    //  if(bgpin_info_each[key] !== undefined) {
    //    in_the_bottom_check = ((!!bgpin_info_each[key+1]) ? bgpin_info_each[key+1]['tops'] - switch_scroll_position_check : holder_bottom);
    //    console.log(in_the_bottom_check);
    //    top_and_bottoms[key] = {
    //      'top_check': parseInt(bgpin_info_each[key]['tops']) - parseInt(switch_scroll_position_check),
    //      'bottom_check': in_the_bottom_check
    //    }/*
    //    if(isMobile === false){
    //      $window.scroll(function(){
    //        last_check = ((!!bgpin_info_each[key+1]) ? bgpin_info_each[key+1]['tops'] - switch_scroll_position_check : holder_bottom);
    //        console.log('------------'+key+'------------');
    //        top_change_px = parseInt(bgpin_info_each[key]['tops']) - parseInt(switch_scroll_position_check);
    //        console.log(bgpin_info_each[key]['tops'] + " - " + switch_scroll_position_check + " = " + top_change_px);
    //        console.log('  ');
    //        if(scroll_top >= top_change_px && scroll_top < last_check) {
    //          console.log('going to fade function');
    //          bg_fade('out', $('.background_imgs:not(.background_imgs-'+(parseInt(key)+1)+')'));
    //          bg_fade('in', $('.background_imgs-'+(parseInt(key)+1)));
    //        }
    //      });
    //    }
    //    // for mobile
    //    if(isMobile === true){
    //      $window.on({
    //        'touchmove': function(e) { 
    //          last_check = ((!!bgpin_info_each[key+1]) ? bgpin_info_each[key+1]['tops'] - switch_scroll_position_check : holder_bottom);
    //          console.log(last_check+' last check');
    //          console.log(scroll_top+' scroll top');
    //          if(scroll_top >= bgpin_info_each[key]['tops'] - switch_scroll_position_check && scroll_top < last_check) {
    //            console.log('change it mogile');
    //            bg_fade('out', $('.background_imgs:not(.background_imgs-'+(parseInt(key)+1)+')'));
    //            bg_fade('in', $('.background_imgs-'+(parseInt(key)+1)));
    //          }
    //        }
    //      });
    //    }*/
    //  }
    //});
//
    //if(isMobile === false){
    //  $window.scroll(function(){
    //    $.each(top_and_bottoms, function(key, value) {
    //      // we are in the area
    //      if(scroll_top >= value.top_check && scroll_top < value.bottom_check) {
    //        if(scroll_top >= bgpin_info_each[key]['tops'] - switch_scroll_position_check && scroll_top < last_check) {
    //        console.log('going to fade function');
    //        console.log('---');
    //        //bg_fade('out', $('.background_imgs:not(.background_imgs-'+(parseInt(key)+1)+')'));
    //        //bg_fade('in', $('.background_imgs-'+(parseInt(key)+1)));
    //      }
    //    });
    //  });
    //}
//
    //$window.resize(function() {
    //  console.log('RESIZE');
    //});
//
    // fading in and out
    function bg_fade(in_or_out, $pinned_bg){
      if(in_or_out == 'in') {
        //$pinned_bg.fadeIn();
        $pinned_bg.stop(true,true).animate({'opacity':1},'fast');
        //$pinned_bg.fadeTo('slow',1);
      }
      if(in_or_out == 'out') {
        //$pinned_bg.fadeOut();
        $pinned_bg.stop(true,true).animate({'opacity':0},'fast');
        //$pinned_bg.fadeTo('slow',0);
      }
    }

    // make it chainable, though I don't know why you would chain this.
    return this;
  };
})( jQuery );

// defaults set so users can update
$.fn.bgpin.defaults = {
  switchAlign: 'middle' // middle or top
};
// jquery.bgpin.js
// Background Fixing with scrolling foregrounds.

(function($){
  jQuery.fn.bgpin = function(){

    // set variables
    var $window = $(window),
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
          middle_of_window = Math.round($window.outerHeight(true)/2)

    // loop through each pinned group
    $.each($this.find('.bgpin-single'), function(key, val){
      var this_val_offset = $(val).offset()
      bgpin_info_each[key] = {'background_image':$(val).css('background-image'),'tops':Math.round(this_val_offset.top)};
      $(val).css({'background-image':'none','z-index':bgpin_count+10});
      var bg_image_css = "background-size: cover; height: 100vh; position: absolute; top:0; width:100%;"
      var new_bg_html = ""
      // new each
      $.each(bgpin_info_each, function(key,value) {
        var z_index = bgpin_count+(bgpin_count - key);
        new_bg_html += "<div class='background_imgs background_imgs-"+(parseInt(key)+1)+"' style='background-image: "+value['background_image']+"; z-index:"+z_index+";"+bg_image_css+"'></div>\n";
      });
      $this.append(new_bg_html);
    });
 
    // checking the scrolling biz 
    $window.scroll(function(){
      scroll_top = $window.scrollTop();
      if(scroll_top >= holder_top && scroll_top < last_bg_top) {
        $('.background_imgs').css({'position': 'fixed'});
        if(scroll_top >= last_bg_top - middle_of_window && scroll_top < holder_bottom) {
          $('.background_imgs').addClass('bg-hidden');
        }
      } else {
        $('.background_imgs').css({'position': 'absolute'});
        $('.background_imgs-'+bgpin_count).css({'bottom':0,'top':'auto'});
      }
    });

    // individual background scroll checking
    $.each($('.background_imgs'), function(key, value){
      if(bgpin_info_each[key] !== undefined) {
        $window.scroll(function(){
          last_check = ((!!bgpin_info_each[key+1]) ? bgpin_info_each[key+1]['tops'] - middle_of_window : holder_bottom);
          if(scroll_top >= bgpin_info_each[key]['tops'] - middle_of_window && scroll_top < last_check) {
            bg_fade('out', $('.background_imgs:not(.background_imgs-'+(parseInt(key)+1)+')'));
            bg_fade('in', $('.background_imgs-'+(parseInt(key)+1)));
          }
        });
      };
    });
 
    // fading in and out
    function bg_fade(in_or_out, $pinned_bg){
      if(in_or_out == 'in') {
        $pinned_bg.fadeIn();
      }
      if(in_or_out == 'out') {
        $pinned_bg.fadeOut();
      }
    }

    // make it chainable, though I don't know why you would chain this.
    return this;
  };
})( jQuery );
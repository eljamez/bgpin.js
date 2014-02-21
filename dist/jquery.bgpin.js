// jquery.bgpin.js
// Background Fixing with scrolling foregrounds.
(function($){
  jQuery.fn.bgpin = function(){

    // set variables
    var $window = $(window),
          $this = $(this),
          _bgpin_count = $this.find('.bgpin-single').length,
          _bgpin_info_each = {},
          _scroll_top,
          $bg_to_fade,
          _holder_top_offset = $this.offset(),
          _holder_top = Math.round(_holder_top_offset.top),
          _holder_bottom = _holder_top + $this.outerHeight(),
          _last_bg = $this.find('.bgpin-single:last-of-type'),
          _last_bg_offset = _last_bg.offset(),
          _last_bg_top = Math.round(_last_bg_offset.top),
          _middle_of_window = Math.round($window.outerHeight(true)/2)

    // loop through each pinned group
    $.each($this.find('.bgpin-single'), function(key, val){
      var _this_val_offset = $(val).offset()
      _bgpin_info_each[key] = {'background_image':$(val).css('background-image'),'tops':Math.round(_this_val_offset.top)};
      $(val).css({'background-image':'none','z-index':_bgpin_count+10});
      var _bg_image_css = "background-size: cover; height: 100vh; position: absolute; top:0; width:100%;"
      var _new_bg_html = ""
      // new each
      $.each(_bgpin_info_each, function(key,value) {
        var z_index = _bgpin_count+(_bgpin_count - key);
        _new_bg_html += "<div class='background_imgs background_imgs-"+(parseInt(key)+1)+"' style='background-image: "+value['background_image']+"; z-index:"+z_index+";"+_bg_image_css+"'></div>\n";
      });
      $this.append(_new_bg_html);
    });
 
    // checking the scrolling biz 
    $window.scroll(function(){
      _scroll_top = $window.scrollTop();
      if(_scroll_top >= _holder_top && _scroll_top < _last_bg_top) {
        $('.background_imgs').css({'position': 'fixed'});
        if(_scroll_top >= _last_bg_top - _middle_of_window && _scroll_top < _holder_bottom) {
          $('.background_imgs').addClass('bg-hidden');
        }
      } else {
        $('.background_imgs').css({'position': 'absolute'});
        $('.background_imgs-'+_bgpin_count).css({'bottom':0,'top':'auto'});
      }
    });

    // individual background scroll checking
    $.each($('.background_imgs'), function(key, value){
      if(_bgpin_info_each[key] !== undefined) {
        $window.scroll(function(){
          last_check = ((!!_bgpin_info_each[key+1]) ? _bgpin_info_each[key+1]['tops'] - _middle_of_window : _holder_bottom);
          if(_scroll_top >= _bgpin_info_each[key]['tops'] - _middle_of_window && _scroll_top < last_check) {
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
  };
})( jQuery );
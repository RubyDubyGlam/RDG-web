/**
 * Copyright (c) 2007-2010 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.2.9b
 */
;(function($){var h=location.href.replace(/#.*/,'');var i=$.localScroll=function(a){$('body').localScroll(a)};i.defaults={duration:1000,axis:'y',event:'click',stop:true,target:window,reset:true};i.hash=function(a){if(location.hash){a=$.extend({},i.defaults,a);a.hash=false;if(a.reset){var d=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=d}scroll(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},i.defaults,b);return b.lazy?this.bind(b.event,function(e){var a=$([e.target,e.target.parentNode]).filter(filter)[0];if(a)scroll(e,a,b)}):this.find('a,area').filter(filter).bind(b.event,function(e){scroll(e,this,b)}).end().end();function filter(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==h&&(!b.filter||$(this).is(b.filter))}};function scroll(e,a,b){var c=a.hash.slice(1),elem=document.getElementById(c)||document.getElementsByName(c)[0];if(!elem)return;if(e)e.preventDefault();var d=$(b.target);if(b.lock&&d.is(':animated')||b.onBefore&&b.onBefore(e,elem,d)===false)return;if(b.stop)d._scrollable().stop(true);if(b.hash){var f=b.offset;f=f&&f.top||f||0;var g=elem.id==c?'id':'name',$a=$('<a> </a>').attr(g,c).css({position:'absolute',top:$(window).scrollTop()+f,left:$(window).scrollLeft()});elem[g]='';$('body').prepend($a);location=a.hash;$a.remove();elem[g]=c}d.scrollTo(elem,b).trigger('notify.serialScroll',[elem])}})(jQuery);
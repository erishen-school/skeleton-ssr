var commonUtil=function(t){return t.test=function(){window.console.log("test")},t.ajaxPost=function(t,n,r,e,o,a){$.ajax({type:"POST",url:t,data:n,dataType:r,beforeSend:function(t){return a&&a(t)},success:function(t){return e&&e(t)},error:function(t){return o&&o(t)}})},t.ajaxGet=function(t,n,r,e,o){$.ajax({type:"GET",url:t,data:n,dataType:r,success:function(t){return e&&e(t)},error:function(t){return o&&o(t)}})},t.strlen=function(t){for(var n=0,r=0;r<t.length;r++){var e=t.charCodeAt(r);1<=e&&e<=126||65376<=e&&e<=65439?n++:n+=2}return n},t.subString=function(t,n,r){for(var e=0,o="",a=/[^\x00-\xff]/g,u="",i=t.replace(a,"**").length,c=0;c<i&&(null!=(u=t.charAt(c).toString()).match(a)?e+=2:e++,!(n<e));c++)o+=u;return r&&n<i&&(o+="..."),o},t.formateTime=function(t){var n=parseInt(t/3600,10),r=parseInt((t-3600*n)/60,10);return n+":"+r+":"+parseInt(t-3600*n-60*r,10)},t.formateTimeNew=function(t){var n=parseInt(t/3600,10),r=parseInt((t-3600*n)/60,10),e=parseInt(t-3600*n-60*r,10);return(n=n<10?"0"+n:n)+":"+(r=r<10?"0"+r:r)+":"+(e=e<10?"0"+e:e)},t.formateNum=function(t){var n=1e5<=t?(t=parseInt(t/1e3)/10)+"万":t;return n},t.guid=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()},t.cutCoverImage=function(n){var t=$(n).width();$(n).css({height:t}),window.onresize=function(){var t=$(n).width();$(n).css({height:t})}},t.formatBeforeShow=function(t){if(t)return t=t.replace(/</g,"&lt;").replace(/>/g,"&gt;")},t.getCurrentTime=function(){var t=new Date,n=t.getHours(),r=t.getMinutes(),e=t.getSeconds();return(n=n<10?"0"+n:n)+":"+(r=r<10?"0"+r:r)+":"+(e=e<10?"0"+e:e)+"."+t.getMilliseconds()},t.getDhmsFromSecond=function(t){var n=parseInt(t/60,10),r=parseInt(n/60,10);r<10&&(r="0"+r),(n=parseInt(n%60,10))<10&&(n="0"+n);var e=parseInt(t%60,10);if(e<10&&(e="0"+e),24<=r){var o=parseInt(r/24,10);return(r-=24*o)<10&&(r="0"+r),{day:o.toString(),hour:r.toString(),minute:n.toString(),second:e.toString()}}return{day:"0",hour:r.toString(),minute:n.toString(),second:e.toString()}},t.consoleLog=function(){window.console.log(this.getCurrentTime(),arguments)},t.trim=function(t){return t.replace(/^\s*|\s*$/g,"")},t}(commonUtil||{});
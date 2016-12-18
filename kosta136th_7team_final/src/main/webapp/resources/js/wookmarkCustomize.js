(function ($) {

      var handler = null;
      var page = 1;
      var isLoading = false;
      var $loaderCircle = $('#loaderCircle');

      var options = {
            autoResize : true,
            offset : 30,
            itemWidth : 440,
      };

      // 스크롤이 계속 내려갈때마다 데이터를 요청한다.
      function onScroll(event) {

        if(!isLoading) {
          // 윈도우 브라우저의 높이가 100 남았을때 데이터를 추가로 받는다
          var closeToBottom = ($(window).scrollTop() + $(window).height() > $(document).height() - 100);
          if (closeToBottom) {
            loadData();
          }
        }

      };

      // 모든 이미지가 로딩되면 레이아웃을 초기화함
      function applyLayout() {

        var wookmark = undefined;
        var container = '#container';

        imagesLoaded(container, function () {

          if (wookmark === undefined) {
            wookmark = new Wookmark(container, options);
          } else {
            wookmark.initItems();
            wookmark.layout(true);
          }

        });

      };

      // AJAX로 API에 데이터 요청함
      function loadData() {

        var apiURL = 'http://www.wookmark.com/api/json/popular';

        isLoading = true;
        $loaderCircle.show();

        $.ajax({
          url : apiURL,
          dataType : 'jsonp',
          data : {page : page},
          success : onLoadData
        });

      };

      // 받아온 API를 HTML에 뿌림
      function onLoadData(data) {

        isLoading = false;
        $loaderCircle.hide();

        // 계속 로딩될때마다 페이지 숫자가 올라감
        page++;

        // HTML 뷰에 뿌려줌
        var html = '';
        var image;

        for(var i=0; i<data.length; i++) {

          image = data[i];
          html += '<li>';
          html += '  <img src="'+image.preview+'" width="400" height="'+Math.round(image.height/image.width*200)+'">';
          html += '  <p>'+image.title+'</p>';
          html += '</li>';

        }

        $(container).append(html);

        applyLayout();

      };

      $(document).bind('scroll', onScroll);

      loadData();

})(jQuery);
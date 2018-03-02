$(document).ready(function() {

  // 添加 item
  $('#add').on('click', function() {

    var item = $('#item'),
        val  = item.val(),
        todo = {
          item: val.trim()
        };

    $.ajax({
      type: 'POST',
      url: '/todo',
      data: todo,
      success: function(data) {
        // 提交成功后刷新
        location.reload();
      }
    });

    return false;
  });

  // 删除 item
  $('.del').on('click', function() {
    // 空格替换成 “-”
    var item = $(this).text().trim().replace(/ /g, '-');

    $.ajax({
      type: 'DELETE',
      url: '/todo/' + item,
      data: '',
      success: function(data) {
        // 删除成功后刷新
        location.reload();
      }
    });

    return false;

  });

});
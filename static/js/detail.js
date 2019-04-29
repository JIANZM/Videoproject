$(function () {

    // 写入csrf
    $.getScript("/static/js/csrftoken.js");

    // 点赞
    $("#like").click(function () {
        var video_id = $("#like").attr("video-id");
        $.ajax({
            url: '/video/like/',
            data: {
                video_id: video_id,
                'csrf_token': csrftoken
            },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                var code = data.code
                if (code == 0) {
                    var likers = data.likers
                    var user_liked = data.user_liked
                    $('#like-count').text(likers)
                    if (user_liked == 0) {
                        $('#like').removeClass("grey").addClass("red")
                    } else {
                        $('#like').removeClass("red").addClass("grey")
                    }
                } else {
                    var msg = data.msg
                    alert(msg)
                }

            },
            error: function (data) {
                alert("点赞失败")
            }
        });
    });

    // 收藏
    $("#star").click(function () {
        var video_id = $("#star").attr("video-id");
        $.ajax({
            url: '/video/collect/',
            data: {
                video_id: video_id,
                'csrf_token': csrftoken
            },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                var code = data.code
                if (code == 0) {
                    var collecters = data.collecters
                    var user_collected = data.user_collected
                    $('#collect-count').text(collecters)
                    if (user_collected == 0) {
                        $('#star').removeClass("grey").addClass("red")
                    } else {
                        $('#star').removeClass("red").addClass("grey")
                    }
                } else {
                    var msg = data.msg
                    alert(msg)
                }

            },
            error: function (data) {
                alert("收藏失败")
            }
        });
    });

    //提交评论
    var form = $('#comment_form')
    form.submit(function () {
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            dataType: 'json',
            data: form.serialize(),
            success: function (data) {
                var code = data.code
                var msg = data.msg
                if (code == 0) {
                    $('#id_content').val("")
                    $('.comment-list').prepend(data.html)
                    $('#comment-result').text("评论成功")
                    $('.info').show().delay(2000).fadeOut(800)
                } else {
                    $('#comment-result').text(msg)
                    $('.info').show().delay(2000).fadeOut(800)
                }
            },
            error: function (data) {
            }
        });
        return false
    })
})

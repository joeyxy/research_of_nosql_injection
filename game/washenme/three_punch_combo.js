/**
 * Created by ph0t0grapher
 */
$i = 0;
$('#start').click(function () {
    $i++;
    if ($i >= 10) {
        $('#start').hide();
        $('#stop').show();
    }
})
$('#stop').click(function () {
    alert('哈哈，别闹了，当选妃呢...')
    $(this).hide();
})
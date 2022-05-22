$(function () {
    $('form').submit(async e => {
        e.preventDefault();

        const q = $('#search').val();

        $('tbody').load('/Reviews/Search2?query='+q);
       /* fetch('/Reviews/Search3?query=' + q)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });

        $('tbody').html('<tr><td>' + data[0].Name + '</td></tr>') */
    })
});
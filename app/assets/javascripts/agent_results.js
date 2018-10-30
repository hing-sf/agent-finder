$(function() {
    // call agent thumbnail from randomuser api endpoint
    $.ajax({
    url: `https://randomuser.me/api/?results=${ $('.agent').length }`,
    dataType: 'json',
    success: function(data) {
        addThumbnail(data)
    }
    });

    // add Thumbnail to each agent
    function addThumbnail( data ){
        let $agents = $('.agent');
        $agents.each((idx, agent) => {
            // update image src and alt tag
            $(agent).find('.agent-thumbnail img').attr({
                'src':data.results[idx].picture.medium,
                'alt':data.results[idx].name.first + ' thumbnail image',
            });
        });
    }

    // filter list of agent by price range, if agent sold 1+ property in range selected, agent will display in the list
    function filterElement( type ){
        const domElement = $('.agent').find('.price-range');
        domElement.each((idx, value) => {
            if($(value).attr('data-range') === type){
                if( $(value).next()[0].innerText > 0 ){
                    $(value).closest('.agent').css('display', 'block');
                } else {
                    $(value).closest('.agent').css('display', 'none');
                }
            }
        })
    }

    // on Dropdown Select, call filter element function
    $('.filter-price').on('click', (e) => {
        e.preventDefault();
        const range = e.currentTarget.dataset.targetRange;
        filterElement( range )
    })
});

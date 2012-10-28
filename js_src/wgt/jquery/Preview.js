;(function($S,undefined){

  $S.fn.wgt_preview = function(  )
  {

    var hideDelay = 500;  
    var currentID ;
    var hideTimer = null;

    // One instance that's reused to show info for the current person
    var container = $S('<div id="wgt-preview-container">'
        + '<table width="" border="0" cellspacing="0" cellpadding="0" align="center" class="wgt-preview-popup">'
        + '<tr>'
        + '   <td class="corner top-left"></td>'
        + '   <td class="top"></td>'
        + '   <td class="corner top-right"></td>'
        + '</tr>'
        + '<tr>'
        + '   <td class="left">&nbsp;</td>'
        + '   <td><div id="wgt-preview-content"></div></td>'
        + '   <td class="right">&nbsp;</td>'
        + '</tr>'
        + '<tr>'
        + '   <td class="corner bottom-left">&nbsp;</td>'
        + '   <td class="bottom">&nbsp;</td>'
        + '   <td class="corner bottom-right"></td>'
        + '</tr>'
        + '</table>'
        + '</div>');

    $('body').append(container);

    $('.personPopupTrigger').live('mouseover', function()
    {
        // format of 'rel' tag: pageid,personguid
        var settings = $(this).attr('rel').split(',');
        var pageID = settings[0];
        currentID = settings[1];

        // If no guid in url rel tag, don't popup blank
        if (currentID == '')
            return;

        if (hideTimer)
            clearTimeout(hideTimer);

        var pos = $(this).offset();
        var width = $(this).width();
        container.css({
            left: (pos.left + width) + 'px',
            top: pos.top - 5 + 'px'
        });

        $('#wgt-preview-content').html('&nbsp;');
          
        /*
        $.ajax({
            type: 'GET',
            url: 'personajax.aspx',
            data: 'page=' + pageID + '&guid=' + currentID,
            success: function(data)
            {
                // Verify that we're pointed to a page that returned the expected results.
                if (data.indexOf('personPopupResult') < 0)
                {
                    $('#wgt-preview-content')
                      .html
                      (
                        '<span >Page ' 
                          + pageID + ' did not return a valid result for person ' + currentID + '.Please have your administrator check the error log.</span>');
                }

                // Verify requested person is this person since we could have multiple ajax
                // requests out if the server is taking a while.
                if (data.indexOf(currentID) > 0)
                {                  
                    var text = $(data).find('.personPopupResult').html();
                    $('#wgt-preview-content').html(text);
                }
            }
        });
        */

        container.css('display', 'block');
    });

    $('.wgt-preview-trigger').live('mouseout', function()
    {
        if (hideTimer)
            clearTimeout(hideTimer);
        hideTimer = setTimeout(function()
        {
            container.css('display', 'none');
        }, hideDelay);
    });

    // Allow mouse over of details without hiding details
    $('#wgt-preview-container').mouseover(function()
    {
        if (hideTimer)
            clearTimeout(hideTimer);
    });

    // Hide after mouseout
    $('#wgt-preview-container').mouseout(function()
    {
        if (hideTimer)
            clearTimeout(hideTimer);
        hideTimer = setTimeout(function()
        {
            container.css('display', 'none');
        }, hideDelay);
    });
    
  };

})($S);
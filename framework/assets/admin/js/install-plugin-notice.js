jQuery( function( $ ) {
    $( 'div.notice.install-gutenverse-plugin-notice' ).on( 'click', 'button.notice-dismiss', function( event ) {
        event.preventDefault();

        $.post( ajaxurl, {
            action: 'gutenverse_set_admin_notice_viewed'
        } );
    } );
} );
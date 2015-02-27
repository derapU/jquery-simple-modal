/*! Simple Modal - v0.1.0 - 2015-02-27
* https://github.com/derapU/jquery-simple-modal
* Copyright (c) 2015 Andreas Berghaus; Licensed MIT */
jQuery( function ( $ ) {
	'use strict';
	var Modal;

	$.fn.modal = function ( opts ) {
		return this.each( function () {
			if ( this.modal ) {
				return this.modal[opts]();
			}
			this.modal = new Modal( $( this ), opts );
			return this;
		} );
	};

	Modal = function ( $content, opts ) {
		this.init( $content, opts );
	};
	Modal.prototype = {
		default_opts: {
			css: { // define your own style
				modal: {},
				container: {}
			},
		},
		opts: null,

		$content:     null,
		$container:   null,
		$modal:       null,
		$placeholder: null,

		init: function ( $content, opts ) {
			console.log( opts );
			// extend default_opts
			this.opts     = $.extend( true, {}, this.default_opts, opts );
			this.$content = $content;

			// create structure
			this.create_modal();
			$( 'body' ).append( this.$modal );

			// bind events
			this.bind_events();
		},

		create_modal: function () {
			var $c   = $( '<div class="simple-modal-container">' ),
				$p   = $( '<div class="simple-modal-placeholder">' ),
				$m   = $( '<div class="simple-modal">' );

			$c.css( this.opts.css.container );

			$m.append( $c );
			$m.css( this.opts.css.modal );

			this.$modal       = $m;
			this.$container   = $c;
			this.$placeholder = $p;
		},
		show: function () {
			this.$content.before( this.$placeholder );
			this.$content.detach();
			this.$container.append( this.$content );

			this.$modal.css( 'display', 'block' );
		},
		hide: function () {
			this.$placeholder.before( this.$content );
			this.$placeholder.detach();

			this.$modal.css( 'display', 'none' );
		},


		bind_events: function () {
			var self = this;
			this.$modal.on( 'click', function () {
				self.hide();
			} );
			this.$container.on( 'click', function ( e ) {
				e.stopPropagation();
				console.log( 'click' );
			} );
		}

	};
} );
//# sourceMappingURL=jquery.simple-modal.js.map
<?php
/**
 * Helper Functionality
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-framework
 */

if ( ! function_exists( 'jlog' ) ) {
	/**
	 * Print Log
	 */
	function jlog() {
		$numargs  = func_num_args();
		$arg_list = func_get_args();
		for ( $i = 0; $i < $numargs; $i++ ) {
			echo '<pre>';
			print_r( $arg_list[ $i ] ); //phpcs:ignore
			echo '</pre>';
		}
	}
}

if ( ! function_exists( 'gutenverse_secure_permalink' ) ) {
	/**
	 * Get Secure Permalink
	 *
	 * @param string $url .
	 *
	 * @return string|string[]|null
	 */
	function gutenverse_secure_permalink( $url ) {
		if ( is_ssl() ) {
			$url = preg_replace( '/^http:/i', 'https:', $url );
		} else {
			$url = preg_replace( '/^https:/i', 'http:', $url );
		}

		return $url;
	}
}

if ( ! function_exists( 'gutenverse_encode_url' ) ) {
	/**
	 * Encode URL
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	function gutenverse_encode_url( $post_id ) {
		$url = get_permalink( $post_id );

		return urlencode( $url ); //phpcs:ignore
	}
}

if ( ! function_exists( 'gutenverse_print_html' ) ) {
	/**
	 * Print HTML with wp_kses
	 *
	 * @param HTML         $html .
	 * @param string|array $condition .
	 */
	function gutenverse_print_html( $html, $condition = null ) {
		echo wp_kses( $html, wp_kses_allowed_html( $condition ) );
	}
}

if ( ! function_exists( 'gutenverse_get_post_date' ) ) {
	/**
	 * Get the post date
	 *
	 * @param \WP_Post      $post Post object.
	 * @param date_format   $format string.
	 * @param display       $type string.
	 * @param custom_format $custom string.
	 *
	 * @return string
	 */
	function gutenverse_get_post_date( $post, $format, $type, $custom ) {
		if ( 'ago' === $format ) {
			$output = gutenverse_get_ago_format( $type, $post );
		} elseif ( 'custom' === $format ) {
			$output = gutenverse_get_date_format( $custom, $post, $type );
		} elseif ( 'default' === $format ) {
			$output = gutenverse_get_date_format( '', $post, $type );
		} else {
			$output = gutenverse_get_date_format( $format, $post, $type );
		}

		return $output;
	}
}


if ( ! function_exists( 'gutenverse_get_date_format' ) ) {
	/**
	 * Get date format
	 *
	 * @param date_format $format string.
	 * @param \WP_Post    $post Post object.
	 * @param display     $type string.
	 *
	 * @return string|int|false
	 */
	function gutenverse_get_date_format( $format = '', $post = null, $type = '' ) {
		if ( 'published' === $type ) {
			return get_the_date( $format, $post );
		}

		return get_the_modified_date( $format, $post );
	}
}

if ( ! function_exists( 'gutenverse_get_ago_format' ) ) {
	/**
	 * Get ago format
	 *
	 * @param display  $type string.
	 * @param \WP_Post $post Post object.
	 *
	 * @return string
	 */
	function gutenverse_get_ago_format( $type, $post ) {
		if ( 'published' === $type ) {
			$output = gutenverse_ago_time( human_time_diff( get_the_time( 'U', $post ), time() ) );
		} else {
			$output = gutenverse_ago_time( human_time_diff( get_the_modified_time( 'U', $post ), time() ) );
		}

		return $output;
	}
}

if ( ! function_exists( 'gutenverse_ago_time' ) ) {
	/**
	 * Get ago time
	 *
	 * @param ago_time $time string.
	 *
	 * @return string
	 */
	function gutenverse_ago_time( $time ) {
		return esc_html(
			sprintf(
				/* translators: 1: Time from now. */
				esc_html__( '%s ago', '--gctd--' ),
				$time
			)
		);
	}
}

if ( ! function_exists( 'gutenverse_post_class' ) ) {
	/**
	 * Get post class
	 *
	 * @param string $class User defined class.
	 * @param null   $post_id Post ID.
	 *
	 * @return string
	 */
	function gutenverse_post_class( $class = '', $post_id = null ) {
		// Separates classes with a single space, collates classes for post DIV.
		return 'class="' . join( ' ', gutenverse_get_post_class( $class, $post_id ) ) . '"';
	}
}

if ( ! function_exists( 'gutenverse_get_post_class' ) ) {
	/**
	 * Custom implementation of get_post_class for Jeg Element
	 *
	 * @param string|array $class One or more classes to add to the class list.
	 * @param int|WP_Post  $post_id Optional. Post ID or post object.
	 *
	 * @return array Array of classes.
	 */
	function gutenverse_get_post_class( $class = '', $post_id = null ) {
		$post = get_post( $post_id );

		$classes = array();

		if ( $class ) {
			if ( ! is_array( $class ) ) {
				$class = preg_split( '#\s+#', $class );
			}
			$classes = array_map( 'esc_attr', $class );
		} else {
			// Ensure that we always coerce class to being an array.
			$class = array();
		}

		if ( ! $post ) {
			return $classes;
		}

		$classes[] = 'post-' . $post->ID;
		if ( ! is_admin() ) {
			$classes[] = $post->post_type;
		}
		$classes[] = 'type-' . $post->post_type;
		$classes[] = 'status-' . $post->post_status;

		// Post Format.
		if ( post_type_supports( $post->post_type, 'post-formats' ) ) {
			$post_format = get_post_format( $post->ID );

			if ( $post_format && ! is_wp_error( $post_format ) ) {
				$classes[] = 'format-' . sanitize_html_class( $post_format );
			} else {
				$classes[] = 'format-standard';
			}
		}

		$post_password_required = post_password_required( $post->ID );

		// Post requires password.
		if ( $post_password_required ) {
			$classes[] = 'post-password-required';
		} elseif ( ! empty( $post->post_password ) ) {
			$classes[] = 'post-password-protected';
		}

		// Post thumbnails.
		if ( current_theme_supports( 'post-thumbnails' ) && has_post_thumbnail( $post->ID ) && ! is_attachment( $post ) && ! $post_password_required ) {
			$classes[] = 'has-post-thumbnail';
		}

		// sticky for Sticky Posts.
		if ( is_sticky( $post->ID ) ) {
			if ( is_home() && ! is_paged() ) {
				$classes[] = 'sticky';
			} elseif ( is_admin() ) {
				$classes[] = 'status-sticky';
			}
		}

		// hentry for hAtom compliance.
		$classes[] = 'hentry';

		// All public taxonomies.
		$taxonomies = get_taxonomies( array( 'public' => true ) );
		foreach ( (array) $taxonomies as $taxonomy ) {
			if ( is_object_in_taxonomy( $post->post_type, $taxonomy ) ) {
				foreach ( (array) get_the_terms( $post->ID, $taxonomy ) as $term ) {
					if ( empty( $term->slug ) ) {
						continue;
					}

					$term_class = sanitize_html_class( $term->slug, $term->term_id );
					if ( is_numeric( $term_class ) || ! trim( $term_class, '-' ) ) {
						$term_class = $term->term_id;
					}

					// 'post_tag' uses the 'tag' prefix for backward compatibility.
					if ( 'post_tag' === $taxonomy ) {
						$classes[] = 'tag-' . $term_class;
					} else {
						$classes[] = sanitize_html_class( $taxonomy . '-' . $term_class, $taxonomy . '-' . $term->term_id );
					}
				}
			}
		}

		$classes = array_map( 'esc_attr', $classes );

		return array_unique( $classes );
	}
}

if ( ! function_exists( 'gutenverse_join_array' ) ) {
	/**
	 * Merge array into string with comma (,)
	 *
	 * @param array $values .
	 * @param bool  $wrap .
	 */
	function gutenverse_join_array( $values, $wrap = true ) {
		return $wrap ? '<span>' . implode( ', ', $values ) . ' </span>' : implode( ', ', $values );
	}
}

if ( ! function_exists( 'gutenverse_get_json' ) ) {
	/**
	 * Get JSON data
	 *
	 * @param string $path .
	 */
	function gutenverse_get_json( $path ) {
		ob_start();
		include $path;
		$data = ob_get_clean();

		return json_decode( $data, true );
	}
}

if ( ! function_exists( 'gutenverse_header_font' ) ) {
	/**
	 * Header Font
	 *
	 * @param array $font_families Array of font family.
	 * @param array $font_variables Array of font id that needed to be loaded.
	 *
	 * @return void
	 */
	function gutenverse_header_font( $font_families, $font_variables ) {
		$families = array();
		$upload_path = wp_upload_dir();
		$upload_url = $upload_path['baseurl'];
		$custom_family = [];
		foreach ( $font_families as $font ) {
			$family 		= $font['value'];
			$type  			= $font['type'];
			$id     		= ! empty( $font['id'] ) ? $font['id'] : null;
			if ( 'google' === $type && ( in_array( $id, $font_variables, true ) || null === $id ) ) {
				$families[ $family ] = isset( $families[ $family ] ) ? $families[ $family ] : array();

				if ( 'google' === $type && ! empty( $font['weight'] ) ) {
					array_push( $families[ $family ], $font['weight'] );
				}
			}else if( 'custom_font_pro' === $type ){
				array_push($custom_family,$family);
			}
		}

		$google_fonts = gutenverse_google_font_params( $families );

		if ( ! empty( $google_fonts ) ) {
			$font_url = add_query_arg(
				array(
					'family'  => join( '|', $google_fonts ),
					'display' => 'swap',
				),
				'//fonts.googleapis.com/css'
			);

			// Enqueue google font.
			wp_enqueue_style(
				'gutenverse-google-font',
				$font_url,
				array(),
				GUTENVERSE_FRAMEWORK_VERSION
			);
		}
		if ( ! empty( $custom_family ) ) {
			foreach ( $custom_family as $value ) {
				// Enqueue google font.
				$font_url = $upload_url . '/' . $value . '.css';
				wp_enqueue_style(
					'gutenverse-custom-font-' . uniqid( $value ),
					$font_url,
					array(),
					GUTENVERSE_FRAMEWORK_VERSION
				);
			}
		}
	}
}

if ( ! function_exists( 'gutenverse_google_font_params' ) ) {
	/**
	 * Get Google Font params
	 *
	 * @param array $families List of font families.
	 *
	 * @return array
	 */
	function gutenverse_google_font_params( $families ) {
		$result = array();

		foreach ( $families as $family => $weights ) {
			$defaults = array( '400', '400italic', '700', '700italic' );
			$weights  = array_merge(
				$defaults,
				$weights
			);
			$weights  = join( ',', array_unique( $weights ) );
			$result[] = ! empty( $weights ) ? "{$family}:{$weights}" : $family;
		}

		return $result;
	}
}

if ( ! function_exists( 'gutenverse_is_previewer' ) ) {
	/**
	 * If current page is previewer
	 */
	function gutenverse_is_previewer() {
		return isset( $_GET['preview'] );
	}
}

if ( ! function_exists( 'gutenverse_is_autosave' ) ) {
	/**
	 * If current request is autosave
	 */
	function gutenverse_is_autosave() {
		return defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE;
	}
}

if ( ! function_exists( 'gutenverse_pro_installed' ) ) {
	/**
	 * Check if gutenverse pro activated.
	 */
	function gutenverse_pro_installed() {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
		$plugin = 'gutenverse-pro/gutenverse-pro.php';

		$installed_plugins = get_plugins();

		return isset( $installed_plugins[ $plugin ] );
	}
}


if ( ! function_exists( 'gutenverse_core_print_header_style' ) ) {
	/**
	 * Print Header Style
	 *
	 * 'gutenverse_core_print_header_style' is deprecated and will not be used anymore
	 *
	 * @param string $name Name of style.
	 * @param string $content Content of css.
	 */
	function gutenverse_core_print_header_style( $name, $content ) {
		?>
		<style id="<?php echo esc_attr( $name ); ?>"> 
			<?php
				echo wp_specialchars_decode( trim( $content ) ); // phpcs:ignore
			?>
		</style>
		<?php
	}
}

if ( ! function_exists( 'is_gutenverse_compatible' ) ) {
	/**
	 * Check if gutenverse is compatible.
	 */
	function is_gutenverse_compatible() {
		return defined( 'GUTENBERG_VERSION' ) || version_compare( $GLOBALS['wp_version'], '5.9', '>=' );
	}
}

if ( ! function_exists( 'gutenverse_get_menu' ) ) {
	/**
	 * Get menu.
	 *
	 * @param int|string $menu_id Menu ID.
	 */
	function gutenverse_get_menu( $menu_id ) {
		return wp_nav_menu(
			array(
				'menu'            => esc_attr( $menu_id ),
				'menu_class'      => 'gutenverse-menu',
				'container_class' => 'gutenverse-menu-container',
				'echo'            => false,
			)
		);
	}
}

if ( ! function_exists( 'gutenverse_template_part_content' ) ) {
	/**
	 * Gutenverse Template Part Content.
	 *
	 * @param array  $attributes Attributes.
	 * @param string $template_part_id Template Part ID.
	 * @param string $area Area.
	 *
	 * @return string
	 */
	function gutenverse_template_part_content( $attributes, &$template_part_id, &$area ) {
		$content = '';

		if (
		isset( $attributes['slug'] ) &&
		isset( $attributes['theme'] ) &&
		wp_get_theme()->get_stylesheet() === $attributes['theme']
		) {
			$template_part_id    = $attributes['theme'] . '//' . $attributes['slug'];
			$template_part_query = new \WP_Query(
				array(
					'post_type'      => 'wp_template_part',
					'post_status'    => 'publish',
					'post_name__in'  => array( $attributes['slug'] ),
					'tax_query'      => array( //phpcs:ignore
						array(
							'taxonomy' => 'wp_theme',
							'field'    => 'slug',
							'terms'    => $attributes['theme'],
						),
					),
					'posts_per_page' => 1,
					'no_found_rows'  => true,
				)
			);

			$template_part_post = $template_part_query->have_posts() ? $template_part_query->next_post() : null;

			if ( $template_part_post ) {
				// A published post might already exist if this template part was customized elsewhere
				// or if it's part of a customized template.
				$content    = $template_part_post->post_content;
				$area_terms = get_the_terms( $template_part_post, 'wp_template_part_area' );
				if ( ! is_wp_error( $area_terms ) && false !== $area_terms ) {
					$area = $area_terms[0]->name;
				}
				/**
				 * Fires when a block template part is loaded from a template post stored in the database.
				 *
				 * @since 5.9.0
				 *
				 * @param string  $template_part_id   The requested template part namespaced to the theme.
				 * @param array   $attributes         The block attributes.
				 * @param WP_Post $template_part_post The template part post object.
				 * @param string  $content            The template part content.
				 */
				do_action( 'render_block_core_template_part_post', $template_part_id, $attributes, $template_part_post, $content );
			} else {
				// Else, if the template part was provided by the active theme,
				// render the corresponding file content.
				$parent_theme_folders        = get_block_theme_folders( get_template() );
				$child_theme_folders         = get_block_theme_folders( get_stylesheet() );
				$child_theme_part_file_path  = get_theme_file_path( '/' . $child_theme_folders['wp_template_part'] . '/' . $attributes['slug'] . '.html' );
				$parent_theme_part_file_path = get_theme_file_path( '/' . $parent_theme_folders['wp_template_part'] . '/' . $attributes['slug'] . '.html' );
				$template_part_file_path     = 0 === validate_file( $attributes['slug'] ) && file_exists( $child_theme_part_file_path ) ? $child_theme_part_file_path : $parent_theme_part_file_path;
				$gutenverse_file_path        = $template_part_file_path;

				if ( ! gutenverse_child_template( 'parts', $attributes['slug'] ) ) {
					$gutenverse_file_path = apply_filters( 'gutenverse_template_path', $template_part_file_path, get_template(), $attributes['slug'] );
				}

				if ( is_child_theme() ) {
					// need to find if file exist on child themes.
					$child_path = get_stylesheet_directory() . '/' . $child_theme_folders['wp_template_part'] . '/' . $attributes['slug'] . '.html';

					if ( ! file_exists( $child_path ) ) {
						$template_part_file_path = $gutenverse_file_path;
					}
				} else {
					// directly overwrite item.
					$template_part_file_path = $gutenverse_file_path;
				}

				if ( 0 === validate_file( $attributes['slug'] ) && file_exists( $template_part_file_path ) ) {
					$content = file_get_contents( $template_part_file_path );
					$content = is_string( $content ) && '' !== $content
						? _inject_theme_attribute_in_block_template_content( $content )
						: '';
				}

				if ( '' !== $content && null !== $content ) {
					/**
					 * Fires when a block template part is loaded from a template part in the theme.
					 *
					 * @since 5.9.0
					 *
					 * @param string $template_part_id        The requested template part namespaced to the theme.
					 * @param array  $attributes              The block attributes.
					 * @param string $template_part_file_path Absolute path to the template path.
					 * @param string $content                 The template part content.
					 */
					do_action( 'render_block_core_template_part_file', $template_part_id, $attributes, $template_part_file_path, $content );
				} else {
					/**
					 * Fires when a requested block template part does not exist in the database nor in the theme.
					 *
					 * @since 5.9.0
					 *
					 * @param string $template_part_id        The requested template part namespaced to the theme.
					 * @param array  $attributes              The block attributes.
					 * @param string $template_part_file_path Absolute path to the not found template path.
					 */
					do_action( 'render_block_core_template_part_none', $template_part_id, $attributes, $template_part_file_path );
				}
			}
		}

		return $content;
	}
}

if ( ! function_exists( 'gutenverse_variable_font_name' ) ) {
	/**
	 * Font Variable Name.
	 *
	 * @param string $id Id of variable.
	 * @param string $child name of child variable.
	 *
	 * @return string
	 */
	function gutenverse_variable_font_name( $id, $child ) {
		return "--gutenverse-font-${child}-${id}";
	}
}

if ( ! function_exists( 'gutenverse_variable_color_name' ) ) {
	/**
	 * Color Variable Name.
	 *
	 * @param string $id Id of variable.
	 *
	 * @return string
	 */
	function gutenverse_variable_color_name( $id ) {
		return "--wp--preset--color--${id}";
	}
}

if ( ! function_exists( 'gutenverse_normal_appender' ) ) {
	/**
	 * Normal Appender.
	 *
	 * @param string $style Style.
	 * @param array  $variable_style Array of Style Object.
	 */
	function gutenverse_normal_appender( $style, &$variable_style ) {
		$variable_style['Desktop'] .= $style;
	}
}

if ( ! function_exists( 'gutenverse_responsive_appender' ) ) {
	/**
	 * Normal Appender.
	 *
	 * @param string $style Style.
	 * @param string $device Device name.
	 * @param array  $variable_style Array of Style Object.
	 */
	function gutenverse_responsive_appender( $style, $device, &$variable_style ) {
		$variable_style[ $device ] .= $style;
	}
}

if ( ! function_exists( 'gutenverse_global_font_style_generator' ) ) {
	/**
	 * Font Style Generator.
	 *
	 * @param array $fonts Font Content.
	 *
	 * @return string|void
	 */
	function gutenverse_global_font_style_generator( $fonts ) {
		$variable_style = array(
			'Desktop' => '',
			'Tablet'  => '',
			'Mobile'  => '',
		);

		foreach ( $fonts as $font ) {
			$id   = $font['id'];
			$font = $font['font'];

			if ( isset( $font['font'] ) ) {
				$thefont = $font['font'];
				if ( $thefont ) {
					gutenverse_normal_appender(
						gutenverse_variable_font_name( $id, 'family' ) . ':' . $thefont['value'] . ';',
						$variable_style
					);
				}
			}

			if ( isset( $font['size'] ) ) {
				$size = $font['size'];
				if ( $size ) {
					foreach ( $variable_style as $device => $value ) {
						if ( isset( $size[ $device ] ) && $size[ $device ]['point'] ) {
							$value = $size[ $device ]['point'] . $size[ $device ]['unit'];
							gutenverse_responsive_appender(
								gutenverse_variable_font_name( $id, 'size' ) . ':' . $value . ';',
								$device,
								$variable_style
							);
						}
					}
				}
			}

			if ( isset( $font['weight'] ) ) {
				$weight = $font['weight'];
				if ( $weight ) {
					$check_weight = 'default' === $weight ? '400' : $weight;
					gutenverse_normal_appender(
						gutenverse_variable_font_name( $id, 'weight' ) . ':' . $check_weight . ';',
						$variable_style
					);
				}
			}

			if ( isset( $font['transform'] ) ) {
				$transform = $font['transform'];
				if ( $transform && 'default' !== $transform ) {
					gutenverse_normal_appender(
						gutenverse_variable_font_name( $id, 'transform' ) . ':' . $transform . ';',
						$variable_style
					);
				}
			}

			if ( isset( $font['style'] ) ) {
				$style = $font['style'];
				if ( $style && 'default' !== $style ) {
					gutenverse_normal_appender(
						gutenverse_variable_font_name( $id, 'style' ) . ':' . $style . ';',
						$variable_style
					);
				}
			}

			if ( isset( $font['decoration'] ) ) {
				$decoration = $font['decoration'];
				if ( $decoration && 'default' !== $decoration ) {
					gutenverse_normal_appender(
						gutenverse_variable_font_name( $id, 'decoration' ) . ':' . $decoration . ';',
						$variable_style
					);
				}
			}

			if ( isset( $font['lineHeight'] ) ) {
				$line_height = $font['lineHeight'];
				if ( $line_height ) {
					foreach ( $variable_style as $device => $value ) {
						if ( isset( $line_height[ $device ] ) && $line_height[ $device ]['point'] ) {
							$value = $line_height[ $device ]['point'] . $line_height[ $device ]['unit'];
							gutenverse_responsive_appender(
								gutenverse_variable_font_name( $id, 'lineHeight' ) . ':' . $value . ';',
								$device,
								$variable_style
							);
						}
					}
				}
			}

			if ( isset( $font['spacing'] ) ) {
				$spacing = $font['spacing'];
				if ( $spacing ) {
					foreach ( $variable_style as $device => $value ) {
						if ( isset( $spacing[ $device ] ) ) {
							$value = $spacing[ $device ];
							gutenverse_responsive_appender(
								gutenverse_variable_font_name( $id, 'spacing' ) . ':' . $value . 'em;',
								$device,
								$variable_style
							);
						}
					}
				}
			}
		}

		return 'body { ' . $variable_style['Desktop'] . ' } 
				@media only screen and (max-width: ' . gutenverse_breakpoint( 'Tablet' ) . 'px) { body {' . $variable_style['Tablet'] . '}
				@media only screen and (max-width: ' . gutenverse_breakpoint( 'Mobile' ) . 'px) { body {' . $variable_style['Mobile'] . '}';
	}
}

if ( ! function_exists( 'gutenverse_global_color_style_generator' ) ) {
	/**
	 * Color Style Generator.
	 *
	 * @param array $colors Color Content.
	 *
	 * @return string|void
	 */
	function gutenverse_global_color_style_generator( $colors ) {
		$variable_style = '';

		foreach ( $colors as $value ) {
			$variable_style .= gutenverse_variable_color_name( $value['slug'] ) . ':' . $value['color'] . ';';
		}

		return 'body { ' . $variable_style . ' }';
	}
}

if ( ! function_exists( 'gutenverse_breakpoint' ) ) {
	/**
	 * Font Style Generator.
	 *
	 * @param string $device Get Default Breakpoint.
	 *
	 * @return string
	 */
	function gutenverse_breakpoint( $device ) {
		$settings_data = get_option( 'gutenverse-settings', array() );

		$tablet_breakpoint = 1024;
		$mobile_breakpoint = 767;

		if ( isset( $settings_data['editor_settings'] ) ) {
			if ( ! empty( $settings_data['editor_settings']['tablet_breakpoint'] ) ) {
				$tablet_breakpoint = $settings_data['editor_settings']['tablet_breakpoint'];
			}

			if ( ! empty( $settings_data['editor_settings']['mobile_breakpoint'] ) ) {
				$mobile_breakpoint = $settings_data['editor_settings']['mobile_breakpoint'];
			}
		}

		switch ( $device ) {
			case 'Desktop':
				return '';
			case 'Tablet':
				return $tablet_breakpoint;
			case 'Mobile':
				return $mobile_breakpoint;
		}
	}
}


if ( ! function_exists( 'gutenverse_get_global_variable' ) ) {
	/**
	 * Get global variables of a theme
	 *
	 * @param string $type which variable to get, default = all.
	 *
	 * @return array
	 */
	function gutenverse_get_global_variable( $type = null ) {
		// Get value from old option.
		$global_variable = get_option( 'gutenverse-global-variable' );

		// Get value from new options.
		$current_theme = get_stylesheet();
		$global_fonts  = get_option( 'gutenverse-global-variable-font-' . $current_theme, array() );
		$global_colors = get_option( 'gutenverse-global-variable-color-' . $current_theme, array() );
		$inc_old_fonts = false;

		if ( ! empty( $global_variable['fonts'] ) ) {
			$global_fonts  = array_merge( $global_fonts, $global_variable['fonts'] );
			$inc_old_fonts = true;
		}

		if ( ! empty( $global_variable['colors'] ) ) {
			$global_colors = array_merge( $global_colors, $global_variable['colors'] );
		}

		if ( 'font' === $type || 'fonts' === $type ) {
			return $global_fonts;
		}

		if ( 'color' === $type || 'colors' === $type ) {
			return $global_colors;
		}

		return array(
			'colors'    => $global_colors,
			'fonts'     => $global_fonts,
			'old_fonts' => $inc_old_fonts,
		);
	}
}

if ( ! function_exists( 'gutenverse_get_theme_settings' ) && class_exists( 'WP_Theme_Json_Resolver' ) ) {
	/**
	 * Get theme settings
	 *
	 * @return array
	 */
	function gutenverse_get_theme_settings() {
		return WP_Theme_Json_Resolver::get_merged_data( 'theme' )->get_settings();
	}
}


if ( ! function_exists( 'gutenverse_child_template' ) ) {
	/**
	 * Check if using child theme
	 * NOTE : WP function is_child_theme() is not used here because there is known issue for PHP 7+
	 * https://developer.wordpress.org/reference/functions/is_child_theme/
	 *
	 * @param string $base : url base.
	 * @param string $slug : theme slug.
	 *
	 * @return array
	 */
	function gutenverse_child_template( $base, $slug ) {
		$is_child_theme = get_template_directory() !== get_stylesheet_directory();
		$template_exist = file_exists( get_stylesheet_directory() . '/' . $base . '/' . $slug . '.html' );

		return $is_child_theme && $template_exist;
	}
}


if ( ! function_exists( 'gutenverse_str_contains' ) ) {
	/**
	 * Determine if a string contains a given substring
	 *
	 * @param string $haystack : The string to search in.
	 * @param string $needle : The substring to search for in the haystack.
	 *
	 * @return array
	 */
	function gutenverse_str_contains( $haystack, $needle ) {
		return '' !== $needle && mb_strpos( $haystack, $needle ) !== false;
	}
}

if ( ! function_exists( 'gutenverse_permission_check_admin' ) ) {
	/**
	 * Check admin permissions.
	 *
	 * @return bool|WP_Error
	 */
	function gutenverse_permission_check_admin() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return new WP_Error(
				'forbidden_permission',
				esc_html__( 'Forbidden Access', '--gctd--' ),
				array( 'status' => 403 )
			);
		}

		return true;
	}
}

if ( ! function_exists( 'gutenverse_permission_check_author' ) ) {
	/**
	 * Check author permissions.
	 *
	 * @return bool|WP_Error
	 */
	function gutenverse_permission_check_author() {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return new WP_Error(
				'forbidden_permission',
				esc_html__( 'Forbidden Access', '--gctd--' ),
				array( 'status' => 403 )
			);
		}

		return true;
	}
}

if ( ! function_exists( 'gutenverse_remove_folder' ) ) {
	/**
	 * Check author permissions.
	 *
	 * @param string $dir Directory.
	 */
	function gutenverse_remove_folder( $dir ) {
		if ( is_dir( $dir ) ) {
			if ( substr( $dir, strlen( $dir ) - 1, 1 ) != '/' ) {
				$dir .= '/';
			}

			$files = glob( $dir . '*', GLOB_MARK );

			foreach ( $files as $file ) {
				if ( is_dir( $file ) ) {
					gutenverse_remove_folder( $file );
				} else {
					unlink( $file );
				}
			}

			rmdir( $dir );
		}
	}
}

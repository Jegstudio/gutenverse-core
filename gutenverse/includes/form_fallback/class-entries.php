<?php
/**
 * Entries class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse\Form_Fallback;

/**
 * Class Entries
 *
 * @package gutenverse
 */
class Entries {
	/**
	 * Post type
	 *
	 * @var string
	 */
	const POST_TYPE = 'gutenverse-entries';

	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'post_type' ), 9 );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_script' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_meta_box' ) );
		add_action( 'manage_' . self::POST_TYPE . '_posts_custom_column', array( $this, 'custom_column' ), 10, 2 );
		add_action( 'pre_get_posts', array( $this, 'custom_column_query' ) );
		add_action( 'restrict_manage_posts', array( $this, 'filter_form_option' ), 10, 1 );

		add_filter( 'manage_' . self::POST_TYPE . '_posts_columns', array( $this, 'set_custom_column' ) );
		add_filter( 'manage_edit-' . self::POST_TYPE . '_sortable_columns', array( $this, 'sortable_columns' ) );
		add_filter( 'post_row_actions', array( $this, 'modify_row_actions' ), 10, 2 );
		add_filter( 'hidden_meta_boxes', array( $this, 'hide_meta_box' ), 10, 2 );
		add_filter( 'posts_join', array( $this, 'search_join' ) );
		add_filter( 'posts_where', array( $this, 'search_where' ) );
		add_filter( 'posts_groupby', array( $this, 'search_groupby' ) );
		add_action( 'admin_notices', array( $this, 'page_form_entries_notice' ) );
	}

	/**
	 * Admin Notice for page form entries.
	 */
	public function page_form_entries_notice() {
		$active_plugins = get_option( 'active_plugins' );
		$url            = wp_nonce_url( self_admin_url( 'edit.php?post_type=gutenverse-entries' ), 'install-plugin_gutenverse_form' );
		$path           = 'gutenverse-form/gutenverse-form.php';
		$active         = is_plugin_active( $path );
		$all_plugin     = get_plugins();
		if ( isset( $all_plugin[ $path ] ) ) {
			if ( $active ) {
				$actions['gutenverse-form'] = 'active';
			} else {
				$actions['gutenverse-form'] = 'inactive';
			}
		} else {
			$actions['gutenverse-form'] = '';
		}
		if ( isset( $_GET['post_type'] ) && 'gutenverse-entries' === $_GET['post_type'] && ! in_array( 'gutenverse-form/gutenverse-form.php', $active_plugins ) ) {
			$this->enqueue_script();
			?>
			<style>
				.notice .close-button{
					position: absolute;
					top: 2px;
					right: 8px;
					cursor: pointer;
				}
			</style>
			<div class="notice gutenverse-upgrade-notice gutenverse-install-form">
				<div class="notice-logo">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10 0C4.47754 0 0 4.47915 0 10C0 15.5241 4.47754 20 10 20C15.5225 20 20 15.5241 20 10C20 4.47915 15.5225 0 10 0ZM10 4.43548C10.9353 4.43548 11.6935 5.19371 11.6935 6.12903C11.6935 7.06435 10.9353 7.82258 10 7.82258C9.06468 7.82258 8.30645 7.06435 8.30645 6.12903C8.30645 5.19371 9.06468 4.43548 10 4.43548ZM12.2581 14.6774C12.2581 14.9446 12.0414 15.1613 11.7742 15.1613H8.22581C7.95859 15.1613 7.74194 14.9446 7.74194 14.6774V13.7097C7.74194 13.4425 7.95859 13.2258 8.22581 13.2258H8.70968V10.6452H8.22581C7.95859 10.6452 7.74194 10.4285 7.74194 10.1613V9.19355C7.74194 8.92633 7.95859 8.70968 8.22581 8.70968H10.8065C11.0737 8.70968 11.2903 8.92633 11.2903 9.19355V13.2258H11.7742C12.0414 13.2258 12.2581 13.4425 12.2581 13.7097V14.6774Z" fill="#FFC908"/>
					</svg>
				</div>
				<div class="notice-content">
					<h2><?php esc_html_e( 'Gutenverse Form Plugin Not Installed!', 'gutenverse' ); ?></h2>
					<p><?php echo esc_html__( 'To use all the features and capabilities of Gutenverse Form, you need to ', 'gutenverse' ); ?> <b><?php echo esc_html__( 'install and activate ', 'gutenverse' ); ?></b><?php echo esc_html__( 'the Gutenverse Form plugin to access all functionalities and enhance your experience.', 'gutenverse' ); ?></p>
					<div class="gutenverse-upgrade-action">
						<a class='button-primary upgrade-themes' id="gutenverse-install-form" href="<?php echo esc_url( $url ); ?>"><?php esc_html_e( 'Install & Activate Gutenverse Form!', 'gutenverse' ); ?></a>
					</div>
				</div>
				<div class="close-button">
					<svg width="8" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.3 8L0.5 7.2L3.7 4L0.5 0.8L1.3 0L4.5 3.2L7.7 0L8.5 0.8L5.3 4L8.5 7.2L7.7 8L4.5 4.8L1.3 8Z" fill="#011627" fill-opacity="0.5"/>
					</svg>
				</div>
			</div>
			<script>
				var actions = <?php echo wp_json_encode( $actions ); ?>;
				function sequenceInstall (plugins, index = 0) {
					if (plugins[index]) {
						var plugin = plugins[index];
						switch (actions[plugin?.slug]) {
							case 'active':
								break;
							case 'inactive':
								var path = plugin?.slug + '/' + plugin?.slug;
								promises.push(
									new Promise((resolve) => {
										fetch(wpApiSettings.root + 'wp/v2/plugins/' + path, {									
											method: 'POST',
											headers: {
												"X-WP-Nonce": wpApiSettings.nonce,
												'Content-Type': 'application/json',
											},
											body: JSON.stringify(
												{
													status: 'active'
												}
											)
										}).then(() => {
											sequenceInstall(plugins, index + 1);
											resolve(plugin);
										}).catch((error) => {
											alert('Plugin Install Failed')	
										});
									})
								);
								break;
							default:
								promises.push(
									new Promise((resolve) => {
										fetch(wpApiSettings.root + 'wp/v2/plugins', {									
											method: 'POST',
											headers: {
												"X-WP-Nonce": wpApiSettings.nonce,
												'Content-Type': 'application/json',
											},
											body: JSON.stringify(
												{
													slug: plugin?.slug,
													status: 'active'
												}
											)
										}).then(() => {
											sequenceInstall(plugins, index + 1);
											resolve(plugin);
										}).catch((error) => {
											alert('Plugin Install Failed')	
										});
									})
								);
								break;
						}
					}

					return;
				};
				(function($) {
					$("#gutenverse-install-form").on('click', function(e) {
						var hasFinishClass = $(this).hasClass('finished');
						var hasLoaderClass = $(this).hasClass('loader');

						if(!hasFinishClass) {
							e.preventDefault();
						}

						if(!hasLoaderClass && !hasFinishClass) {
							promises = [];
							var plugins = [
								{
									'slug' : 'gutenverse-form',
									'name' : 'Gutenverse Form'
								}
							];
							$(this).addClass('loader').text('Loading...');

							sequenceInstall(plugins);
							Promise.all(promises).then(() => {						
								$(this).removeClass('loader').addClass('finished').text('Reload Page');
							});
						}
					});
				})(jQuery);
				(function($) {
					$('.notice .close-button').on('click', function() {
						$('.gutenverse-install-form').fadeOut();
					});
				})(jQuery);
			</script>
			<?php
		}
	}
	/**
	 * Enqueue Script
	 */
	public function enqueue_script() {
		$screen = get_current_screen();

		if ( self::POST_TYPE === $screen->post_type ) {
			wp_enqueue_style(
				'gutenverse-entries',
				GUTENVERSE_URL . '/assets/css/form.css',
				null,
				GUTENVERSE_VERSION
			);
		}
	}

	/**
	 * Add filter for form option
	 *
	 * @param string $post_type .
	 */
	public function filter_form_option( $post_type ) {
		if ( self::POST_TYPE === $post_type ) {
			$selected = isset( $_GET['form_id'] ) ? (int) $_GET['form_id'] : '';
			$forms    = self::get_form_list();
			?>
			<select name='form_id'>
				<option value=''><?php esc_html_e( 'All Form', 'gutenverse-form' ); ?></option>
			<?php
			foreach ( $forms as $form ) {
				echo wp_kses(
					sprintf(
						'<option value="%s"%s>%s</option>',
						$form->ID,
						(int) $selected === (int) $form->ID ? ' selected="selected"' : '',
						$form->post_title
					),
					array(
						'option' => array(
							'value'    => true,
							'selected' => true,
						),
					)
				);
			}
			?>
			</select>
			<?php
		}
	}

	/**
	 * Get form title
	 */
	private static function get_form_list() {
		$args = array(
			'post_type' => 'gutenverse-form',
		);

		wp_reset_postdata();
		$posts = get_posts( $args );
		wp_reset_postdata();

		return $posts;
	}

	/**
	 * Hide parent metaboxes
	 *
	 * @param array $hidden .
	 * @param -     $screen .
	 *
	 * @return array
	 */
	public function hide_meta_box( $hidden, $screen ) {
		if ( self::POST_TYPE === $screen->post_type ) {
			$hidden[] = 'submitdiv';
			$hidden[] = 'pageparentdiv';
		}

		return $hidden;
	}

	/**
	 * Edit row actions
	 *
	 * @param array  $actions .
	 * @param object $post .
	 *
	 * @return array
	 */
	public function modify_row_actions( $actions, $post ) {
		// Check for your post type.
		if ( self::POST_TYPE === $post->post_type && ! empty( $actions['trash'] ) ) {
			$trash   = $actions['trash'];
			$actions = array();
			$url     = admin_url( '/post.php?post=' . $post->ID );
			$link    = add_query_arg( array( 'action' => 'edit' ), $url );

			$actions = array(
				'view' => sprintf(
					'<a href="%1$s">%2$s</a>',
					esc_url( $link ),
					esc_html( __( 'View', 'contact-form-7' ) )
				),
			);

			$actions['trash'] = $trash;
		}

		return $actions;
	}

	/**
	 * Post Join.
	 *
	 * @param string $join .
	 *
	 * @return string
	 */
	public function search_join( $join ) {
		global $pagenow, $wpdb;

		if ( ! is_admin() || 'edit.php' !== $pagenow ) {
			return $join;
		}

		$post_type = isset( $_GET['post_type'] ) ? wp_kses( wp_unslash( $_GET['post_type'] ), wp_kses_allowed_html() ) : '';

		if ( self::POST_TYPE === $post_type ) {
			try {
				$search = get_search_query();
				if ( ! empty( $search ) ) {
					$join .= 'LEFT JOIN ' . $wpdb->postmeta . ' as pm1 ON ' . $wpdb->posts . '.ID = pm1.post_id ';
				}
			} catch ( \Throwable $th ) {
				return $join;
			}
		}
		return $join;
	}

	/**
	 * Post Where.
	 *
	 * @param string $where .
	 *
	 * @return string
	 */
	public function search_where( $where ) {
		global $pagenow, $wpdb;

		if ( ! is_admin() || 'edit.php' !== $pagenow ) {
			return $where;
		}

		$post_type = isset( $_GET['post_type'] ) ? wp_kses( wp_unslash( $_GET['post_type'] ), wp_kses_allowed_html() ) : '';

		if ( self::POST_TYPE === $post_type ) {
			$search = get_search_query();

			if ( ! empty( $search ) ) {
				try {
					$search = get_search_query();
					if ( ! empty( $search ) ) {
						$search_form = " ( SELECT ID from {$wpdb->posts} where {$wpdb->posts}.post_title LIKE '%{$search}%' ) ";
						$post_type   = self::POST_TYPE;

						$where = " AND ( {$wpdb->posts}.post_type = '{$post_type}' AND {$wpdb->posts}.post_title LIKE '%{$search}%' )
								OR ( pm1.meta_key = 'form-id' AND pm1.meta_value IN {$search_form} ) ";
					}
				} catch ( \Throwable $th ) {
					return $where;
				}
			}
		}

		return $where;
	}

	/**
	 * Post Group By.
	 *
	 * @param string $groupby .
	 *
	 * @return string
	 */
	public function search_groupby( $groupby ) {
		global $wpdb;

		$groupby = "{$wpdb->posts}.ID";

		return $groupby;
	}

	/**
	 * Sortable Column
	 *
	 * @param array $columns .
	 *
	 * @return array
	 */
	public function sortable_columns( $columns ) {
		$columns['form_parent'] = 'form_parent';
		$columns['post_parent'] = 'post_parent';
		return $columns;
	}

	/**
	 * Custom column query
	 *
	 * @param Query $query .
	 */
	public function custom_column_query( $query ) {
		if ( is_admin() && self::POST_TYPE === $query->query['post_type'] ) {
			$orderby = $query->get( 'orderby' );
			$form_id = isset( $_GET['form_id'] ) ? (int) $_GET['form_id'] : '';

			if ( (int) $form_id > 0 ) {
				$meta_query = array(
					array(
						'key'     => 'form-id',
						'compare' => '=',
						'value'   => $form_id,
					),
				);

				$query->set( 'meta_query', $meta_query );
			}

			if ( 'form_parent' === $orderby ) {
				$meta_query = array_merge(
					$meta_query,
					array(
						'relation' => 'OR',
						array(
							'key'     => 'form-id',
							'compare' => 'NOT EXISTS',
						),
						array(
							'key' => 'form-id',
						),
					)
				);

				$query->set( 'meta_query', $meta_query );
				$query->set( 'orderby', 'meta_value' );
			}

			wp_reset_postdata();
		}
	}

	/**
	 * Custom column.
	 *
	 * @param array $column .
	 * @param int   $post_id .
	 */
	public function custom_column( $column, $post_id ) {
		if ( 'form_parent' === $column ) {
			$form_id  = get_post_meta( $post_id, 'form-id', true );
			$title    = get_the_title( $form_id );
			$link     = admin_url( '/edit.php?post_type=' . self::POST_TYPE . '&form_id=' . $form_id );
			$form_ref = 0 !== (int) $form_id ? '<a href="' . $link . '">' . $title . '</a>' : __( 'no-form', 'gutenverse-form' );

			gutenverse_print_html( $form_ref );
		}

		if ( 'post_parent' === $column ) {
			$ref_id   = get_post_meta( $post_id, 'post-id', true );
			$title    = get_the_title( $ref_id );
			$link     = get_post_permalink( $ref_id );
			$form_ref = 0 !== (int) $ref_id ? '<a href="' . $link . '">' . $title . '</a>' : __( 'no-referral', 'gutenverse-form' );

			gutenverse_print_html( $form_ref );
		}
	}

	/**
	 * Set custom columns.
	 *
	 * @return array
	 */
	public function set_custom_column() {
		$columns['cb']          = __( 'Checkbox', 'gutenverse-form' );
		$columns['title']       = __( 'Title', 'gutenverse-form' );
		$columns['form_parent'] = __( 'Form', 'gutenverse-form' );
		$columns['post_parent'] = __( 'Referral', 'gutenverse-form' );
		$columns['date']        = __( 'Date', 'gutenverse-form' );

		return $columns;
	}

	/**
	 * Save Submitted Data
	 *
	 * @param array $params .
	 *
	 * @return int
	 */
	public static function submit_form_data( $params ) {
		$post_arr = array(
			'post_title'  => __( 'Entry', 'gutenverse-form' ),
			'post_status' => 'publish',
			'post_type'   => self::POST_TYPE,
			'meta_input'  => $params,
		);

		$result = wp_insert_post( $post_arr );

		if ( (int) $result > 0 ) {
			$update_title = array(
				'ID'         => $result,
				'post_title' => __( 'Entry #', 'gutenverse-form' ) . $result,
			);

			$result = wp_update_post( $update_title );
		}

		return $result;
	}

	/**
	 * Register Post Type
	 */
	public function post_type() {
		register_post_type(
			self::POST_TYPE,
			array(
				'labels'              =>
					array(
						'name'               => esc_html__( 'Entries', 'gutenverse-form' ),
						'singular_name'      => esc_html__( 'Entries', 'gutenverse-form' ),
						'menu_name'          => esc_html__( 'Entries', 'gutenverse-form' ),
						'add_new'            => esc_html__( 'New Entries', 'gutenverse-form' ),
						'add_new_item'       => esc_html__( 'Create Entry', 'gutenverse-form' ),
						'edit_item'          => esc_html__( 'View Entry Option', 'gutenverse-form' ),
						'new_item'           => esc_html__( 'New Entry', 'gutenverse-form' ),
						'view_item'          => esc_html__( 'View Entry', 'gutenverse-form' ),
						'search_items'       => esc_html__( 'Search Entry', 'gutenverse-form' ),
						'not_found'          => esc_html__( 'No entry found', 'gutenverse-form' ),
						'not_found_in_trash' => esc_html__( 'No Entry in Trash', 'gutenverse-form' ),
						'parent_item_colon'  => '',
					),
				'description'         => esc_html__( 'Gutenverse Form Entries', 'gutenverse-form' ),
				'public'              => true,
				'exclude_from_search' => true,
				'capability_type'     => 'post',
				'capabilities'        => array(
					'create_posts' => 'do_not_allow',
				),
				'hierarchical'        => false,
				'supports'            => array( 'title', 'revisions', 'page-attributes' ),
				'map_meta_cap'        => true,
				'show_in_menu'        => 'gutenverse-form',
				'rewrite'             => array(
					'slug' => self::POST_TYPE,
				),
				'publicly_queryable'  => false,
			)
		);
	}

	/**
	 * Add Entry metaboxes
	 *
	 * @param - $post_type post type.
	 */
	public function add_meta_box( $post_type ) {
		if ( self::POST_TYPE === $post_type ) {

			// Form metabox.
			add_meta_box(
				'gutenverse-entries-form',
				__( 'Form Info', 'gutenverse-form' ),
				array( $this, 'form_data_metabox' ),
				self::POST_TYPE,
				'advanced',
				'high'
			);

			// Data metabox.
			add_meta_box(
				'gutenverse-entries-data',
				__( 'Entry Info', 'gutenverse-form' ),
				array( $this, 'entry_data_metabox' ),
				self::POST_TYPE,
				'advanced',
				'high'
			);

			// Data metabox.
			add_meta_box(
				'gutenverse-browser-data',
				__( 'Browser Info', 'gutenverse-form' ),
				array( $this, 'browser_data_metabox' ),
				self::POST_TYPE,
				'side',
				'high'
			);
		}
	}

	/**
	 * Add Entry metaboxes
	 *
	 * @param - $post post.
	 */
	public function entry_data_metabox( $post ) {
		$entry  = get_post_meta( $post->ID, 'entry-data', true );
		$result = '<div class="entry-title">Entry ID</div>
		<div class="entry-data">' . $post->ID . '</div>';

		if ( isset( $entry ) ) {
			foreach ( $entry as $item ) {
				$value = is_array( $item['value'] ) ? gutenverse_join_array( $item['value'] ) : $item['value'];
				$value = ! empty( $value ) ? $value : esc_html__( 'empty', 'gutenverse-form' );

				$result .= '<div class="entry-title">Input ID : ' . $item['id'] . '</div>
				<div class="entry-data">' . $value . '</div>';
			}
		}

		gutenverse_print_html( $result, 'post' );
	}

	/**
	 * Add Entry metaboxes
	 *
	 * @param - $post post.
	 */
	public function form_data_metabox( $post ) {
		$form_id = get_post_meta( $post->ID, 'form-id', true );

		if ( $form_id ) {
			$form_title = get_the_title( $form_id );
			$form_link  = admin_url( '/edit.php?post_type=' . self::POST_TYPE . '&form_id=' . $form_id );

			$result = '<div class="entry-title">Form ID</div>
			<div class="entry-data">' . $form_id . '</div>
			<div class="entry-title">Form Action</div>
			<div class="entry-data"><a href="' . $form_link . '">' . $form_title . '</a></div>';
		} else {
			$result = '<div class="entry-title">Form ID</div>
			<div class="entry-data">' . __( 'Form is not set', 'gutenverse-form' ) . '</div>
			<div class="entry-title">Form Action</div>
			<div class="entry-data">' . __( 'Not found', 'gutenverse-form' ) . '</div>';
		}

		gutenverse_print_html( $result, 'post' );
	}

	/**
	 * Add Browser metaboxes
	 *
	 * @param - $post post.
	 */
	public function browser_data_metabox( $post ) {
		$browser = get_post_meta( $post->ID, 'browser-data', true );
		$result  = '<div class="entry-title">IP Address</div>
		<div class="entry-data">disabled</div>
		<div class="entry-title">Browser Data</div>
		<div class="entry-data">disabled</div>';

		if ( ! empty( $browser ) ) {
			$result = '<div class="entry-title">IP Address</div>
			<div class="entry-data">' . $browser['ip'] . '</div>
			<div class="entry-title">Browser Data</div>
			<div class="entry-data">' . $browser['user_agent'] . '</div>';
		}

		gutenverse_print_html( $result, 'post' );
	}

	/**
	 * Get Total Entries
	 *
	 * @param integer $form_id Form Action ID.
	 *
	 * @return integer
	 */
	public static function get_total_entries( $form_id ) {
		$posts = get_posts(
			array(
				'post_type'  => self::POST_TYPE,
				'meta_query' => array( //phpcs:ignore
					array(
						'key'     => 'form-id',
						'value'   => $form_id,
						'compare' => '===',
					),
				),
			)
		);

		return count( $posts );
	}
}

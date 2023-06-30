<?php
/**
 * Post Block Abstract class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use WP_Term;
use WP_User;

/**
 * Class Post Block Abstract
 *
 * @package gutenverse\block
 */
abstract class Post_Abstract extends Block_Abstract {
	/**
	 * Hold Thumbnail Cache
	 *
	 * @var array
	 */
	private static $thumbnail = array();

	/**
	 * Filter attributes
	 *
	 * @param post_attributes $attr object.
	 */
	public function filter_post_attributes( $attr ) {
		if ( isset( $attr['contentSelection'] ) && 'related' === $attr['contentSelection'] ) {
			$post_id   = $attr['postId'];
			$post_type = get_post_type( $post_id );
			$category  = array();
			$post_tag  = array();

			if ( in_array( $attr['relatedFilter'], array( 'category', 'both' ), true ) ) {
				$cats = get_the_category( $post_id );

				if ( $cats ) {
					foreach ( $cats as $cat ) {
						$category[] = $cat->term_id;
					}
				}
			}

			if ( in_array( $attr['relatedFilter'], array( 'tag', 'both' ), true ) ) {
				$tags = get_the_tags( $post_id );

				if ( $tags ) {
					foreach ( $tags as $tag ) {
						$post_tag[] = $tag->term_id;
					}
				}
			}

			$attr['excludePost'][] = $post_id;

			if ( ! empty( $post_type ) ) {
				$attr['postType'] = $post_type;
			} else {
				$attr['postType'] = array();
			}

			$attr['includeTag'][]      = $post_tag;
			$attr['includeCategory'][] = $category;

			add_filter(
				'gutenverse_default_query_args',
				function ( $args, $filtered_attr ) use ( $attr ) {
					if ( isset( $attr['contentSelection'] ) && 'related' === $attr['contentSelection'] ) {
						if ( in_array( $attr['relatedFilter'], array( 'tag', 'both' ), true ) ) {
							if ( empty( $attr['includeTag'] ) ) {
								$args['tag__in'] = array( 0 );
							}
						}

						if ( in_array( $attr['relatedFilter'], array( 'category', 'both' ), true ) ) {
							if ( empty( $attr['includeCategory'] ) ) {
								$args['category__in'] = array( 0 );
							}
						}
					}

					return $args;
				},
				10,
				2
			);
		}

		$this->attributes = $attr;
	}

	/**
	 * Render block element
	 *
	 * @return mixed
	 */
	public function render_block_element() {
		if ( isset( $this->attributes['results'] ) ) {
			$results = $this->attributes['results'];
		} else {
			$results = $this->build_query( $this->attributes );
		}

		if ( ! empty( $results['result'] ) ) {
			$content = $this->render_column( $results['result'] );
		} else {
			$content = $this->empty_content();
		}

		$pagination = $this->render_pagination( $results['next'], $results['total_page'] );

		return '<div class="guten-block-container">
            ' . apply_filters( 'gutenverse_module_block_container_extend', $content, $this->attributes ) . '
        </div>' . $pagination;
	}

	/**
	 * Get post thumbnail
	 *
	 * @param  int    $post_id Post ID.
	 * @param  string $size    Image size.
	 * @return mixed
	 */
	public function get_thumbnail( $post_id, $size ) {
		$additional_class = '';

		if ( ! has_post_thumbnail( $post_id ) ) {
			$additional_class = 'no_thumbnail';
		}

		$thumbnail =
		'<div class="thumbnail-container ' . $additional_class . '">
            ' . get_the_post_thumbnail( $post_id, $size ) . '
			<div class="guten-overlay"></div>
        </div>';

		return $thumbnail;
	}

	/**
	 * Format Date for frontend view.
	 *
	 * @param  int|\WP_Post $post Post object.
	 * @return mixed
	 */
	public function format_date( $post ) {
		$date_type     = isset( $this->attributes['metaDateType'] ) ? $this->attributes['metaDateType'] : 'published';
		$date_format   = isset( $this->attributes['metaDateFormat'] ) ? $this->attributes['metaDateFormat'] : 'default';
		$custom_format = isset( $this->attributes['metaDateFormatCustom'] ) ? $this->attributes['metaDateFormatCustom'] : '';

		if ( 'both' === $date_type ) {
			$output = gutenverse_get_post_date( $post, $date_format, 'published', $custom_format );
			$output = $output . esc_html__( ' - Updated on ', 'gutenverse' );
			$output = $output . gutenverse_get_post_date( $post, $date_format, 'modified', $custom_format );
		} else {
			$output = gutenverse_get_post_date( $post, $date_format, $date_type, $custom_format );
		}

		return $output;
	}

	/**
	 * Render column method
	 *
	 * @param  array $result Result.
	 * @return mixed|string
	 */
	public function render_column( $result ) {
		return '<div class="guten-posts guten-ajax-flag">
            ' . $this->build_column( $result ) . '
        </div>';
	}

	/**
	 * Prepare to build query.
	 *
	 * @param array $attr Attribute.
	 *
	 * @return array
	 */
	protected function build_query( $attr ) {
		if ( isset( $attr['uniqueContent'] ) && 'disable' !== $attr['uniqueContent'] ) {
			if ( ! empty( $attr['excludePost'] ) ) {
				$exclude_post = explode( ',', $attr['excludePost'] );
			} else {
				$exclude_post = array();
			}

			$exclude_post        = array_merge( $this->manager->get_unique_article( $attr['uniqueContent'] ), $exclude_post );
			$attr['excludePost'] = implode( ',', $exclude_post );

			// we need to alter attribute here...
			$this->attributes = $attr;
		}

		$result = $this->get_query( $attr );

		if ( isset( $attr['uniqueContent'] ) && 'disable' !== $attr['uniqueContent'] ) {
			$this->manager->add_unique_article( $attr['uniqueContent'], $this->collect_post_id( $result ) );
		}

		if ( isset( $result['result'] ) ) {
			foreach ( $result['result'] as $post ) {
				do_action( 'guten_json_archive_push', $post->ID );
			}
		}

		return $result;
	}

	/**
	 * Extract post id from result.
	 *
	 * @param array $content Content.
	 *
	 * @return array
	 */
	protected function collect_post_id( $content ) {
		$post_ids = array();
		foreach ( $content['result'] as $result ) {
			$post_ids[] = $result->ID;
		}

		return $post_ids;
	}

	/**
	 * Retrieve Query from defined Attribute
	 *
	 * @param array $attr Attribute.
	 *
	 * @return array
	 */
	public static function get_query( $attr ) {
		$attr = self::filter_attribute( $attr );

		if ( self::is_jetpack_query( $attr ) ) {
			$result = self::jetpack_query( $attr );
		} else {
			$result = self::default_query( $attr );
		}

		self::optimize_query( $result );

		return $result;
	}

	/**
	 * Filter Attribute to only include what necessary.
	 *
	 * @param array $attr Filter Attribute.
	 *
	 * @return array
	 */
	public static function filter_attribute( $attr ) {
		$accepted = array(
			'postId',
			'inheritQuery',
			'postType',
			'numberPost',
			'postOffset',
			'includePost',
			'excludePost',
			'includeCategory',
			'excludeCategory',
			'includeAuthor',
			'includeTag',
			'excludeTag',
			'sortBy',
			'paged',
			'videoOnly',
			'paginationNumberPost',
			'paginationMode',
			'dateQuery',
			'year',
			'monthnum',
			'day',
			'qApi',
			'qSearch',
			'qCategory',
			'qTag',
			'qAuthor',
		);

		$accepted = apply_filters( 'gutenverse_accept_query_attribute', $accepted, $attr );

		foreach ( $attr as $key => $value ) {
			if ( ! in_array( $key, $accepted, true ) ) {
				unset( $attr[ $key ] );
			}
		}

		if ( isset( $attr['paginationNumberPost'] ) ) {
			$attr['paginationNumberPost'] = intval( $attr['paginationNumberPost'] );
		}

		if ( isset( $attr['paged'] ) ) {
			$attr['paged'] = intval( $attr['paged'] );
		}

		if ( isset( $attr['numberPost'] ) ) {
			$attr['numberPost'] = intval( $attr['numberPost'] );
		}

		if ( ! isset( $attr['paginationNumberPost'] ) ) {
			$attr['paginationNumberPost'] = $attr['numberPost'];
		}

		if ( ! isset( $attr['sortBy'] ) ) {
			$attr['sortBy'] = 'latest';
		}

		return $attr;
	}

	/**
	 * Check if is jetpack query
	 *
	 * @param array $attr WordPress Jetpack Query.
	 *
	 * @return boolean
	 */
	public static function is_jetpack_query( $attr ) {
		return 'popular_post_jetpack_day' === $attr['sortBy'] || 'popular_post_jetpack_week' === $attr['sortBy'] || 'popular_post_jetpack_month' === $attr['sortBy'] || 'popular_post_jetpack_all' === $attr['sortBy'];
	}

	/**
	 * Filter inclusion/exlusion array
	 *
	 * @param array $arr inclusion/exclusion array.
	 *
	 * @return array
	 */
	public static function filter_array( $arr ) {
		$result = array();

		foreach ( $arr as $item ) {
			$result[] = $item['value'];
		}

		return $result;
	}

	/**
	 * Build Query of WordPress Default
	 *
	 * @param array $attr Attribute.
	 *
	 * @return array
	 */
	private static function default_query( $attr ) {
		$include_category = array();
		$exclude_category = array();
		$result           = array();
		$args             = array();

		$args['post_type']           = $attr['postType'];
		$args['paged']               = isset( $attr['paged'] ) ? $attr['paged'] : 1;
		$args['offset']              = self::calculate_offset( $args['paged'], $attr['postOffset'], $attr['numberPost'], $attr['paginationNumberPost'] );
		$args['posts_per_page']      = ( $args['paged'] > 1 ) ? $attr['paginationNumberPost'] : $attr['numberPost'];
		$args['no_found_rows']       = ! isset( $attr['paginationMode'] ) || 'disable' === $attr['paginationMode'];
		$args['ignore_sticky_posts'] = 1;

		if ( true === $attr['inheritQuery'] || 'true' === $attr['inheritQuery'] ) {
			if ( ! empty( $attr['qApi'] ) ) {
				$args['s']             = ! empty( $attr['qSearch'] ) ? esc_attr( $attr['qSearch'] ) : null;
				$args['category_name'] = ! empty( $attr['qCategory'] ) ? esc_attr( $attr['qCategory'] ) : null;
				$args['tag']           = ! empty( $attr['qTag'] ) ? esc_attr( $attr['qTag'] ) : null;
				$args['author']        = ! empty( $attr['qAuthor'] ) ? esc_attr( $attr['qAuthor'] ) : null;
			} else {
				$search_query = get_search_query();
				$object_query = get_queried_object();

				$args['s'] = ! empty( $search_query ) ? esc_attr( $search_query ) : null;

				if ( ! empty( $object_query ) ) {
					if ( $object_query instanceof WP_Term ) {
						switch ( $object_query->taxonomy ) {
							case 'category':
								$args['category_name'] = $object_query->slug;
								break;
							case 'post_tag':
								$args['tag'] = $object_query->slug;
								break;
						}
					}

					if ( $object_query instanceof WP_User ) {
						$args['author'] = $object_query->ID;
					}
				}
			}
		}

		if ( ! empty( $attr['includePost'] ) ) {
			$args['post__in'] = self::filter_array( $attr['includePost'] );
		}

		if ( ! empty( $attr['excludePost'] ) ) {
			$args['post__not_in'] = self::filter_array( $attr['excludePost'] );
		}

		if ( ! empty( $attr['includeCategory'] ) ) {
			$categories = self::filter_array( $attr['includeCategory'] );
			self::recursive_category( $categories, $include_category );
			$args['category__in'] = $include_category;
		}

		if ( ! empty( $attr['excludeCategory'] ) ) {
			$categories = self::filter_array( $attr['excludeCategory'] );
			self::recursive_category( $categories, $exclude_category );
			$args['category__not_in'] = $exclude_category;
		}

		if ( ! empty( $attr['includeAuthor'] ) ) {
			$args['author__in'] = self::filter_array( $attr['includeAuthor'] );
		}

		if ( ! empty( $attr['includeTag'] ) ) {
			$args['tag__in'] = self::filter_array( $attr['includeTag'] );
		}

		if ( ! empty( $attr['excludeTag'] ) ) {
			$args['tag__not_in'] = self::filter_array( $attr['excludeTag'] );
		}

		// order.
		if ( 'latest' === $attr['sortBy'] ) {
			$args['orderby'] = 'date';
			$args['order']   = 'DESC';
		}

		if ( 'oldest' === $attr['sortBy'] ) {
			$args['orderby'] = 'date';
			$args['order']   = 'ASC';
		}

		if ( 'alphabet_asc' === $attr['sortBy'] ) {
			$args['orderby'] = 'title';
			$args['order']   = 'ASC';
		}

		if ( 'alphabet_desc' === $attr['sortBy'] ) {
			$args['orderby'] = 'title';
			$args['order']   = 'DESC';
		}

		if ( 'random' === $attr['sortBy'] ) {
			$args['orderby'] = 'rand';
		}

		if ( 'random_week' === $attr['sortBy'] ) {
			$args['orderby']    = 'rand';
			$args['date_query'] = array(
				array(
					'after' => '1 week ago',
				),
			);
		}

		if ( 'random_month' === $attr['sortBy'] ) {
			$args['orderby']    = 'rand';
			$args['date_query'] = array(
				array(
					'after' => '1 year ago',
				),
			);
		}

		if ( 'most_comment' === $attr['sortBy'] ) {
			$args['orderby'] = 'comment_count';
			$args['order']   = 'DESC';
		}

		if ( isset( $attr['videoOnly'] ) && true === $attr['videoOnly'] ) {
			$args['tax_query'] = array( //phpcs:ignore
				array(
					'taxonomy' => 'post_format',
					'field'    => 'slug',
					'terms'    => array(
						'post-format-video',
					),
					'operator' => 'IN',
				),
			);
		}

		// date.
		if ( isset( $attr['dateQuery'] ) ) {
			$args['date_query'] = $attr['dateQuery'];
		}
		if ( isset( $attr['year'] ) ) {
			$args['year'] = $attr['year'];
		}
		if ( isset( $attr['day'] ) ) {
			$args['day'] = $attr['day'];
		}
		if ( isset( $attr['monthnum'] ) ) {
			$args['monthnum'] = $attr['monthnum'];
		}

		$args['post_status'] = 'publish';

		$args = apply_filters( 'gutenverse_default_query_args', $args, $attr );

		// Query.
		$query = new \WP_Query( $args );

		foreach ( $query->posts as $post ) {
			$result[] = $post;
		}

		wp_reset_postdata();

		return array(
			'result'     => $result,
			'next'       => self::has_next_page( $query->found_posts, $args['paged'], $args['offset'], $attr['numberPost'], $attr['paginationNumberPost'] ),
			'prev'       => self::has_prev_page( $args['paged'] ),
			'total_page' => self::count_total_page( $query->found_posts, $args['paged'], $args['offset'], $attr['numberPost'], $attr['paginationNumberPost'] ),
		);
	}

	/**
	 * Get category to its child.
	 *
	 * @param array $categories Category to be checked.
	 * @param array $result Result for recursive category.
	 */
	private static function recursive_category( $categories, &$result ) {
		foreach ( $categories as $category ) {
			if ( ! in_array( $category, $result, true ) ) {
				$result[] = $category;
				$children = get_categories( array( 'parent' => $category ) );

				if ( ! empty( $children ) ) {
					$child_id = array();
					foreach ( $children as $child ) {
						$child_id[] = $child->term_id;
					}
					self::recursive_category( $child_id, $result );
				}
			}
		}
	}

	/**
	 * Jetpack Query
	 *
	 * @param array $attr Attribute.
	 *
	 * @return array
	 */
	private static function jetpack_query( $attr ) {
		$result = array();

		if ( function_exists( 'stats_get_csv' ) ) {
			switch ( $attr['sortBy'] ) {
				case 'popular_post_jetpack_week':
					$days = 7;
					break;
				case 'popular_post_jetpack_month':
					$days = 30;
					break;
				case 'popular_post_jetpack_day':
					$days = 2;
					break;
				case 'popular_post_jetpack_all':
				default:
					$days = - 1;
					break;
			}

			$top_posts = stats_get_csv(
				'postviews',
				array(
					'days'  => $days,
					'limit' => $attr['numberPost'] + 5,
				)
			);

			if ( ! $top_posts ) {
				return array();
			}

			$counter = 0;
			foreach ( $top_posts as $post ) {
				$the_post = get_post( $post['post_id'] );

				if ( ! $the_post ) {
					continue;
				}

				if ( 'post' !== $the_post->post_type ) {
					continue;
				}

				$counter ++;
				$result[] = get_post( $post['post_id'] );

				if ( $counter === $attr['numberPost'] ) {
					break;
				}
			}
		}

		return array(
			'result'     => $result,
			'next'       => false,
			'prev'       => false,
			'total_page' => 1,
		);
	}

	/**
	 * Build element with wrapper
	 *
	 * @param string $element_name Element name.
	 * @param string $inner Inner element.
	 * @param array  $array_classes Classes.
	 * @param array  $array_data Data attribute.
	 * @param array  $id Element ID.
	 *
	 * @return string
	 */
	protected function render_wrapper( $element_name, $inner, $array_classes = array(), $array_data = array(), $id = null ) {
		$classes = '';
		$data    = '';

		foreach ( $array_classes as $class ) {
			$classes = $classes . ' ' . $class;
		}

		foreach ( $array_data as $key => $value ) {
			$data = $data . ' data-' . $key . '="' . $value . '"';
		}

		if ( $id ) {
			$id = 'id="' . $id . '"';
		}

		$classes = 'gutenverse guten-' . $element_name . $classes . ' ' . $this->attributes['elementId'];

		return '<div ' . $id . ' class="' . $classes . '" ' . $data . '>' . $inner . '</div>';
	}

	/**
	 * Get settings attribute
	 *
	 * @return string
	 */
	protected function render_settings() {
		if ( isset( $this->attributes['elementId'] ) ) {
			$keys = $this->get_ajax_param();

			$attr = array_filter(
				$this->attributes,
				function ( $key ) use ( $keys ) {
					return in_array( $key, $keys, true );
				},
				ARRAY_FILTER_USE_KEY
			);

			$attr['paged'] = 1;
			$attr['class'] = isset( $this->id ) ? $this->id : null;

			return htmlspecialchars( json_encode( $attr ), ENT_QUOTES, 'UTF-8' );
		}
	}

	/**
	 * Render pagination
	 *
	 * @param  bool $next Next.
	 * @param  int  $total Total page.
	 * @return string
	 */
	protected function render_pagination( $next = false, $total = 1 ) {
		$output           = '';
		$icon             = esc_attr( $this->attributes['paginationIcon'] );
		$icon_position    = esc_attr( $this->attributes['paginationIconPosition'] );
		$pagination_align = isset( $this->attributes['paginationAlign'] ) ? esc_attr( $this->attributes['paginationAlign'] ) : '';

		if ( in_array( $this->attributes['paginationMode'], array( 'loadmore', 'scrollload' ), true ) && $next ) {
			$output = '<span data-load="' . esc_attr( $this->attributes['paginationLoadmoreText'] ) . '" data-loading="' . esc_attr( $this->attributes['paginationLoadingText'] ) . '"> ' . esc_attr( $this->attributes['paginationLoadmoreText'] ) . '</span>';

			if ( ! empty( $icon ) ) {
				if ( 'before' === $icon_position ) {
					$output = '<i aria-hidden="true" class="' . $icon . '"></i>' . $output;
				} else {
					$output = $output . '<i aria-hidden="true" class="' . $icon . '"></i>';
				}
			}

			$output = '<div class="guten-block-loadmore icon-position-' . $icon_position . '">' . $output . '</div>';
			$output = '<div class="guten-block-pagination guten-align' . $pagination_align . '">' . apply_filters( 'gutenverse_module_block_pagination_extend', $output, $this->attributes ) . '</div>';
		}

		return $output;
	}


	/**
	 * Optimize query
	 *
	 * @param array $results array of query result.
	 */
	private static function optimize_query( $results ) {
		self::cache_thumbnail( $results );
	}

	/**
	 * Cache thumbnail so it won't retrieve another on other query.
	 *
	 * @param array $results array of query result.
	 */
	public static function cache_thumbnail( $results ) {
		$thumbnails = array();

		foreach ( $results['result'] as $result ) {
			if ( ! in_array( $result->ID, self::$thumbnail, true ) ) {
				$thumbnails[]      = get_post_thumbnail_id( $result->ID );
				self::$thumbnail[] = $result->ID;
			}
		}

		if ( ! empty( $thumbnails ) ) {
			$query = array(
				'post__in'  => $thumbnails,
				'post_type' => 'attachment',
				'showposts' => count( $thumbnails ),
			);

			get_posts( $query );
		}
	}

	/**
	 * Calculate Offset
	 *
	 * @param int $paged Current Page.
	 * @param int $offset Offset post.
	 * @param int $number_post Number post for first page.
	 * @param int $number_post_ajax Number post for ajax request.
	 *
	 * @return int
	 */
	private static function calculate_offset( $paged, $offset, $number_post, $number_post_ajax ) {
		$new_offset = 0;

		if ( isset( $offset['size'] ) ) {
			$offset = $offset['size'];
		}

		$paged = (int) $paged;

		if ( 1 === $paged ) {
			$new_offset = (int) $offset;
		}

		if ( 2 === $paged ) {
			$new_offset = $number_post + (int) $offset;
		}

		if ( 3 <= $paged ) {
			$new_offset = $number_post + (int) $offset + ( $number_post_ajax * ( $paged - 2 ) );
		}

		return $new_offset;
	}

	/**
	 * Check if we have next page
	 *
	 * @param int $total Total number of query result.
	 * @param int $curpage Current Page.
	 * @param int $offset Offset post.
	 * @param int $perpage Number post for first page.
	 * @param int $perpage_ajax Number post for ajax request.
	 *
	 * @return bool
	 */
	private static function has_next_page( $total, $curpage = 1, $offset = 0, $perpage = 2, $perpage_ajax = 2 ) {
		$curpage = (int) $curpage;

		if ( 1 === $curpage ) {
			return (int) $total > (int) $offset + (int) $perpage;
		}

		if ( $curpage > 1 ) {
			return (int) $total > (int) $offset + (int) $perpage_ajax;
		}

		return false;
	}

	/**
	 * Check if we have previous page
	 *
	 * @param int $curpage Current Page.
	 *
	 * @return bool
	 */
	private static function has_prev_page( $curpage = 1 ) {
		if ( $curpage <= 1 ) {
			return false;
		}

		return true;
	}

	/**
	 * Get total count of total page
	 *
	 * @param int $total Total number of query result.
	 * @param int $curpage Current Page.
	 * @param int $offset Offset post.
	 * @param int $perpage Number post for first page.
	 * @param int $perpage_ajax Number post for ajax request.
	 *
	 * @return int
	 */
	private static function count_total_page( $total, $curpage = 1, $offset = 0, $perpage = 2, $perpage_ajax = 2 ) {
		$remain = (int) $total - ( (int) $offset + (int) $perpage );

		if ( $remain > 0 ) {
			while ( $remain > 0 ) {
				$remain -= $perpage_ajax;
				$curpage ++;
			}
		}

		return $curpage;
	}
}

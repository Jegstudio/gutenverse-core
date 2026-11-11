<?php
/**
 * Standalone pagination regression checks: php tests/post-pagination.php
 */

namespace Gutenverse\Framework\Block;

// Load the real query helpers without bootstrapping WordPress.
abstract class Block_Abstract {}

function apply_filters( $hook, $value ) {
	return $value;
}

require_once __DIR__ . '/../framework/includes/block/class-post-abstract.php';

$count = new \ReflectionMethod( Post_Abstract::class, 'count_total_page' );
$count->setAccessible( true );
$checks = 0;

function check_same( $expected, $actual ) {
	global $checks;
	++$checks;
	if ( $expected !== $actual ) {
		throw new \RuntimeException( 'Expected ' . var_export( $expected, true ) . ', got ' . var_export( $actual, true ) );
	}
}

// Malformed page sizes must be normalized before reaching WP_Query.
foreach ( array( 'prevnext', 'number', 'loadmore', 'scrollload' ) as $mode ) {
	foreach ( array( 0, -1, '0', '-10', 'invalid' ) as $size ) {
		$attributes = Post_Abstract::filter_attribute(
			array(
				'paginationMode'       => $mode,
				'numberPost'           => $size,
				'paginationNumberPost' => $size,
			)
		);
		check_same( 1, $attributes['numberPost'] );
		check_same( 1, $attributes['paginationNumberPost'] );
		// Also verify the helper independently of attribute normalization.
		check_same( 10, $count->invoke( null, $mode, 10, 1, 0, $size, $size ) );
	}
}

// Preserve the original result for valid inputs, including unequal page sizes.
foreach ( array( 'prevnext', 'number', 'normal-number', 'loadmore', 'scrollload' ) as $mode ) {
	foreach ( array( 0, 1, 5, 10, 23, 100 ) as $total ) {
		foreach ( array( 1, 2, 5 ) as $page ) {
			foreach ( array( 0, 3, 20 ) as $offset ) {
				$expected = $page;
				$step     = in_array( $mode, array( 'loadmore', 'scrollload' ), true ) ? 3 : 5;
				for ( $remaining = $total - ( $offset + 5 ); $remaining > 0; $remaining -= $step ) {
					++$expected;
				}
				check_same( $expected, $count->invoke( null, $mode, $total, $page, $offset, 5, 3 ) );
			}
		}
	}
}

// A large result count must not require one iteration per page.
check_same( 1000000000, $count->invoke( null, 'prevnext', 1000000000, 1, 0, 1, 1 ) );

echo "Passed $checks pagination checks.\n";

<?php
/**
 * Style Generator class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse\Form_Fallback;

use Gutenverse\Form_Fallback\Style\Form_Builder;
use Gutenverse\Form_Fallback\Style\Form_Input_Checkbox;
use Gutenverse\Form_Fallback\Style\Form_Input_Date;
use Gutenverse\Form_Fallback\Style\Form_Input_Email;
use Gutenverse\Form_Fallback\Style\Form_Input_Multiselect;
use Gutenverse\Form_Fallback\Style\Form_Input_Number;
use Gutenverse\Form_Fallback\Style\Form_Input_Radio;
use Gutenverse\Form_Fallback\Style\Form_Input_Select;
use Gutenverse\Form_Fallback\Style\Form_Input_Submit;
use Gutenverse\Form_Fallback\Style\Form_Input_Switch;
use Gutenverse\Form_Fallback\Style\Form_Input_Telp;
use Gutenverse\Form_Fallback\Style\Form_Input_Text;
use Gutenverse\Form_Fallback\Style\Form_Input_Textarea;

/**
 * Class Style Generator
 *
 * @package gutenverse
 */
class Style_Generator {
	/**
	 * Font Families
	 *
	 * @var array
	 */
	protected $font_families = array();

	/**
	 * Font Variables
	 *
	 * @var array
	 */
	protected $font_variables = array();

	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'gutenverse_block_style_instance', array( $this, 'get_block_style_instance' ), 10, 3 );
	}

	/**
	 * Get Block Style Instance.
	 *
	 * @param object $instance Block Instance.
	 * @param string $name Block Name.
	 * @param array  $attrs Block Attribute.
	 *
	 * @return Style_Abstract
	 */
	public function get_block_style_instance( $instance, $name, $attrs ) {
		switch ( $name ) {
			case 'gutenverse/form-builder':
				$instance = new Form_Builder( $attrs );
				break;
			case 'gutenverse/form-input-checkbox':
				$instance = new Form_Input_Checkbox( $attrs );
				break;
			case 'gutenverse/form-input-date':
				$instance = new Form_Input_Date( $attrs );
				break;
			case 'gutenverse/form-input-email':
				$instance = new Form_Input_Email( $attrs );
				break;
			case 'gutenverse/form-input-multiselect':
				$instance = new Form_Input_Multiselect( $attrs );
				break;
			case 'gutenverse/form-input-number':
				$instance = new Form_Input_Number( $attrs );
				break;
			case 'gutenverse/form-input-radio':
				$instance = new Form_Input_Radio( $attrs );
				break;
			case 'gutenverse/form-input-select':
				$instance = new Form_Input_Select( $attrs );
				break;
			case 'gutenverse/form-input-submit':
				$instance = new Form_Input_Submit( $attrs );
				break;
			case 'gutenverse/form-input-switch':
				$instance = new Form_Input_Switch( $attrs );
				break;
			case 'gutenverse/form-input-telp':
				$instance = new Form_Input_Telp( $attrs );
				break;
			case 'gutenverse/form-input-text':
				$instance = new Form_Input_Text( $attrs );
				break;
			case 'gutenverse/form-input-textarea':
				$instance = new Form_Input_Textarea( $attrs );
				break;
		}

		return $instance;
	}
}


import { __ } from '@wordpress/i18n';

const V200 = () => {
    const { gutenverseAssetURL: assetURL } = window['GutenverseDashboard'];

    return (
        <>
            <div className="inner-content">
                <div className="top-content">
                    <div className="badge">{__('New', 'gutenverse')}</div>
                    <h5><strong>{__('What\'s New?', 'gutenverse')}</strong></h5>
                    <p>{__('This is a big update, focusing on performance, ecosystem, and adding more premium features.', 'gutenverse')}</p>
                </div>
                <h4>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="6" fill="url(#paint0_linear_15666_7689)" />
                        <path d="M19.488 17.6C19.552 17.072 19.6 16.544 19.6 16C19.6 15.456 19.552 14.928 19.488 14.4H22.192C22.32 14.912 22.4 15.448 22.4 16C22.4 16.552 22.32 17.088 22.192 17.6M18.072 22.048C18.552 21.16 18.92 20.2 19.176 19.2H21.536C20.7609 20.5346 19.5313 21.5456 18.072 22.048ZM17.872 17.6H14.128C14.048 17.072 14 16.544 14 16C14 15.456 14.048 14.92 14.128 14.4H17.872C17.944 14.92 18 15.456 18 16C18 16.544 17.944 17.072 17.872 17.6ZM16 22.368C15.336 21.408 14.8 20.344 14.472 19.2H17.528C17.2 20.344 16.664 21.408 16 22.368ZM12.8 12.8H10.464C11.2311 11.4618 12.4598 10.4492 13.92 9.952C13.44 10.84 13.08 11.8 12.8 12.8ZM10.464 19.2H12.8C13.08 20.2 13.44 21.16 13.92 22.048C12.4629 21.5453 11.2359 20.5342 10.464 19.2ZM9.808 17.6C9.68 17.088 9.6 16.552 9.6 16C9.6 15.448 9.68 14.912 9.808 14.4H12.512C12.448 14.928 12.4 15.456 12.4 16C12.4 16.544 12.448 17.072 12.512 17.6M16 9.624C16.664 10.584 17.2 11.656 17.528 12.8H14.472C14.8 11.656 15.336 10.584 16 9.624ZM21.536 12.8H19.176C18.9256 11.8092 18.5549 10.8527 18.072 9.952C19.544 10.456 20.768 11.472 21.536 12.8ZM16 8C11.576 8 8 11.6 8 16C8 18.1217 8.84285 20.1566 10.3431 21.6569C11.086 22.3997 11.9679 22.989 12.9385 23.391C13.9091 23.7931 14.9494 24 16 24C18.1217 24 20.1566 23.1571 21.6569 21.6569C23.1571 20.1566 24 18.1217 24 16C24 14.9494 23.7931 13.9091 23.391 12.9385C22.989 11.9679 22.3997 11.086 21.6569 10.3431C20.914 9.60028 20.0321 9.011 19.0615 8.60896C18.0909 8.20693 17.0506 8 16 8Z" fill="white" />
                        <defs>
                            <linearGradient id="paint0_linear_15666_7689" x1="-12.2857" y1="-6.57143" x2="60.2857" y2="66.5714" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4569FF" />
                                <stop offset="0.16" stopColor="#4C82FD" />
                                <stop offset="0.55" stopColor="#5BB7F8" />
                                <stop offset="0.84" stopColor="#64D8F5" />
                                <stop offset="1" stopColor="#68E4F4" />
                            </linearGradient>
                        </defs>
                    </svg>
                    {__('Introducing the Plugin Ecosystem', 'gutenverse')}
                </h4>
                <p>{__('We\'re thrilled to announce that Gutenverse has evolved into a dynamic plugin ecosystem. This transformation paves the way for the release of numerous exciting plugins in the future.', 'gutenverse')}</p>
                <div className="detail-ecosystem">
                    <img src={assetURL + '/img/upgrade-notice-2.0.0-ecosystem.png'}></img>
                </div>
                <p><strong>{__('What exactly does a plugin ecosystem do? ', 'gutenverse')}</strong>{__('Essentially, we\'re breaking down each independent feature into its own distinct plugin.', 'gutenverse')}</p>
                <p><strong>{__('Why we\'re taking this approach? ', 'gutenverse')}</strong>{__('The primary benefit is that no longer will all these features be confined within a single.', 'gutenverse')}</p>
                <h4>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="6" fill="url(#paint0_linear_15666_7557)" />
                        <rect width="32" height="32" rx="6" fill="url(#paint1_linear_15666_7557)" />
                        <g clipPath="url(#clip0_15666_7557)">
                            <path d="M9.77778 19.6667L8 9.88889L12.8889 14.3333L16 9L19.1111 14.3333L24 9.88889L22.2222 19.6667H9.77778ZM22.2222 22.3333C22.2222 22.8667 21.8667 23.2222 21.3333 23.2222H10.6667C10.1333 23.2222 9.77778 22.8667 9.77778 22.3333V21.4444H22.2222V22.3333Z" fill="white" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_15666_7557" x1="-12.2857" y1="-6.57143" x2="60.2857" y2="66.5714" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4569FF" />
                                <stop offset="0.16" stopColor="#4C82FD" />
                                <stop offset="0.55" stopColor="#5BB7F8" />
                                <stop offset="0.84" stopColor="#64D8F5" />
                                <stop offset="1" stopColor="#68E4F4" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_15666_7557" x1="21.5814" y1="4.57143" x2="-8.34679" y2="17.1707" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FF808B" />
                                <stop offset="1" stopColor="#F93A50" />
                            </linearGradient>
                            <clipPath id="clip0_15666_7557">
                                <rect width="16" height="16" fill="white" transform="translate(8 8)" />
                            </clipPath>
                        </defs>
                    </svg>
                    {__('Unlocking PRO Features!', 'gutenverse')}
                </h4>
                <p>{__('Your patience has paid off! We are thrilled to introduce our awaited PRO features, which provides advanced options, blocks, a comprehensive template library, and much more. Let\'s delve into some of the remarkable PRO features.', 'gutenverse')}</p>
                <div className="features-highlight orange feature-1">
                    <div>
                        <h5>{__('Advance Animation Effect', 'gutenverse')}</h5>
                        <p>
                            {__('These dynamic elements not only enhance its visual appeal but also provide an engaging way to capture your visitors\' attention. The list of animation effects, including ', 'gutenverse')}
                            <strong>{__('movement, scaling, rotation, skewing, and opacity.', 'gutenverse')}</strong>
                        </p>
                    </div>
                    <img src={assetURL + '/img/upgrade-notice-2.0.0-adanim.png'}></img>
                </div>
                <div className="features-3-col">
                    <div>
                        <img src={assetURL + '/img/upgrade-notice-2.0.0-background-effect.png'}></img>
                        <h5>{__('Background Effect', 'gutenverse')}</h5>
                        <p>{__('Add a glow effect to make your website more eye-catching.', 'gutenverse')}</p>
                    </div>
                    <div>
                        <img src={assetURL + '/img/upgrade-notice-2.0.0-mouse-effect.png'}></img>
                        <h5>{__('Mouse Move Effect', 'gutenverse')}</h5>
                        <p>{__('Make an effect on the pointed object whenever the cursor moves.', 'gutenverse')}</p>
                    </div>
                    <div>
                        <img src={assetURL + '/img/upgrade-notice-2.0.0-fluid-background.png'}></img>
                        <h5>{__('Fluid Background', 'gutenverse')}</h5>
                        <p>{__('Give a hint of uniqueness to your website with fluid background.', 'gutenverse')}</p>
                    </div>
                </div>
                <div className="features-detail">
                    <img src={assetURL + '/img/upgrade-notice-2.0.0-pro-elements.png'}></img>
                    <div>
                        <h5>{__('PRO Elements', 'gutenverse')}</h5>
                        <p>{__('A wide range of elements are provided to empower you to make your website stand out. There are Lottie, Text Marque, Advance Tabs, Advance Button, Mega Menu, Stapper Navigation Button, Image Radio, Payment, and more that you can explore.', 'gutenverse')}</p>
                    </div>
                </div>
                <div className="features-highlight orange feature-2">
                    <div>
                        <h5>{__('Text Clip', 'gutenverse')}</h5>
                        <p>
                            {__('Transform your text into a visually appealing element by applying the text clip feature.  ', 'gutenverse')}
                            <strong>{__('Add gradients and images  ', 'gutenverse')}</strong>
                            {__('directly to your text, allowing for a stunning and dynamic display that gives a unique touch to your design. ', 'gutenverse')}
                        </p>
                    </div>
                    <img src={assetURL + '/img/upgrade-notice-2.0.0-textclip.png'}></img>
                </div>
                <div className="features-3-col">
                    <div>
                        <img src={assetURL + '/img/upgrade-notice-2.0.0-transform.png'}></img>
                        <h5>{__('Transform', 'gutenverse')}</h5>
                        <p>{__('Easily rotate, scale, or skew elements on your website as you like.', 'gutenverse')}</p>
                    </div>
                    <div>
                        <img src={assetURL + '/img/upgrade-notice-2.0.0-custom-font.png'}></img>
                        <h5>{__('Custom Font', 'gutenverse')}</h5>
                        <p>{__('Go beyond with custom font to express your unique style.', 'gutenverse')}</p>
                    </div>
                    <div>
                        <div className="img-text">
                            <p>{__('Highlight important details effortlessly and effectively.', 'gutenverse')}</p>
                        </div>
                        <h5>{__('Highlight Text', 'gutenverse')}</h5>
                        <p>{__('Highlighting text with solid colors, gradients, or fill the background.', 'gutenverse')}</p>
                    </div>
                </div>
                <div className="features-detail reverse">
                    <img src={assetURL + '/img/upgrade-notice-2.0.0-popup.png'}></img>
                    <div>
                        <h5>{__('Advanced Pop Up Builder', 'gutenverse')}</h5>
                        <p>{__('Create attractive and informative popups effortlessly by adjusting triggers, position, and width to suit your design. The powerful and user-friendly feature enhances efficiency, allowing you to decide whether you want your popup displayed across your entire website.', 'gutenverse')}</p>
                    </div>
                </div>
                <div className="features-highlight blue feature-3">
                    <div>
                        <h5>{__('Advance Template Library', 'gutenverse')}</h5>
                        <p>
                            {__('Template library is an excellent choice for creating a visually stunning website. There are ', 'gutenverse')}
                            <strong>{__('trendy and high-quality designs ', 'gutenverse')}</strong>
                            {__('that cater to various niches, including agency, writer, creator, and marketer niches. Browse through over a hundred designs to find the ideal design for everyone.', 'gutenverse')}
                        </p>
                    </div>
                    <img className="library" src={assetURL + '/img/upgrade-notice-2.0.0-library.png'}></img>
                </div>
                <div className="features-3-col">
                    <div>
                        <img src={assetURL + '/img/upgrade-notice-2.0.0-lottie.png'}></img>
                        <h5>{__('Lottie', 'gutenverse')}</h5>
                        <p>{__('Add a Lottie file to your website and display it anywhere you want.', 'gutenverse')}</p>
                    </div>
                    <div>
                        <img src={assetURL + '/img/upgrade-notice-2.0.0-megamenu.png'}></img>
                        <h5>{__('Mega Menu', 'gutenverse')}</h5>
                        <p>{__('Display multiple levels of navigation in a drop-down format to navigate.', 'gutenverse')}</p>
                    </div>
                    <div>
                        <img src={assetURL + '/img/upgrade-notice-2.0.0-marquee.png'}></img>
                        <h5>{__('Text & Image Marquee', 'gutenverse')}</h5>
                        <p>{__('Make your website stand out with scrolling text and image marquee.', 'gutenverse')}</p>
                    </div>
                </div>
                <div className="features-detail">
                    <img src={assetURL + '/img/upgrade-notice-2.0.0-form.png'}></img>
                    <div>
                        <h5>{__('Advanced Form', 'gutenverse')}</h5>
                        <p>{__('Use advance form blocks to gather information from visitors. With this block, you can create contact form, multi step form, conditional form, booking form, newsletter signup and other types of form. You can design the form you want and customize it to perfectly fit your page.', 'gutenverse')}</p>
                    </div>
                </div>

                <div className="features-highlight green feature-4">
                    <div>
                        <h5>{__('Cursor Effect', 'gutenverse')}</h5>
                        <p>
                            {__('Create a more dynamic and ', 'gutenverse')}
                            <strong>{__('interactive experience ', 'gutenverse')}</strong>
                            {__('for your visitors by using a cursor effect. Customize it with any style, text, or image. Without a single line of coding, simply adjust the cursor as needed.', 'gutenverse')}
                        </p>
                    </div>
                    <img className="library" src={assetURL + '/img/upgrade-notice-2.0.0-cursor-effect.png'}></img>
                </div>
                <div className="features-detail reverse">
                    <img src={assetURL + '/img/upgrade-notice-2.0.0-shape-divider.png'}></img>
                    <div>
                        <h5>{__('Shape Divider Animated', 'gutenverse')}</h5>
                        <p>{__('Create an engaging and responsive design with Gutenverse\'s highly responsive shape divider animated for your website. You can add our exclusive and lightweight feature at the top and bottom sections of your website. Simply control the element to suit your needs.', 'gutenverse')}</p>
                    </div>
                </div>
                <div className="features-3-col">
                    <div>
                        <img src={assetURL + '/img/upgrade-notice-2.0.0-bganim.png'}></img>
                        <h5>{__('Background Animated', 'gutenverse')}</h5>
                        <p>{__('Enhance your design and impress visitors with background animations.', 'gutenverse')}</p>
                    </div>
                    <div>
                        <img src={assetURL + '/img/upgrade-notice-2.0.0-sticky.png'}></img>
                        <h5>{__('Sticky', 'gutenverse')}</h5>
                        <p>{__('Stick an element in any position on the page viewport as visitors scroll.', 'gutenverse')}</p>
                    </div>
                    <div>
                        <img src={assetURL + '/img/upgrade-notice-2.0.0-filter.png'}></img>
                        <h5>{__('Confition Filters', 'gutenverse')}</h5>
                        <p>{__('Choose which elements or content should be displayed on the page.', 'gutenverse')}</p>
                    </div>
                </div>
                <h4>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="6" fill="url(#paint0_linear_15666_8693)" />
                        <g clipPath="url(#clip0_15666_8693)">
                            <path d="M16 8C17.0609 8 18.0783 8.42143 18.8284 9.17157C19.5786 9.92172 20 10.9391 20 12C20 13.0609 19.5786 14.0783 18.8284 14.8284C18.0783 15.5786 17.0609 16 16 16C14.9391 16 13.9217 15.5786 13.1716 14.8284C12.4214 14.0783 12 13.0609 12 12C12 10.9391 12.4214 9.92172 13.1716 9.17157C13.9217 8.42143 14.9391 8 16 8ZM16 24C16 24 24 24 24 22C24 19.6 20.1 17 16 17C11.9 17 8 19.6 8 22C8 24 16 24 16 24Z" fill="white" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_15666_8693" x1="-12.2857" y1="-6.57143" x2="60.2857" y2="66.5714" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4569FF" />
                                <stop offset="0.16" stopColor="#4C82FD" />
                                <stop offset="0.55" stopColor="#5BB7F8" />
                                <stop offset="0.84" stopColor="#64D8F5" />
                                <stop offset="1" stopColor="#68E4F4" />
                            </linearGradient>
                            <clipPath id="clip0_15666_8693">
                                <rect width="16" height="16" fill="white" transform="translate(8 8)" />
                            </clipPath>
                        </defs>
                    </svg>

                    {__('Unlocking PRO Features!', 'gutenverse')}
                </h4>
                <p>{__('Our commitment to enhancing code quality is our top priority. We\'ve consistently refined our code to ensure that your frontend sites maintain a lightweight profile, delivering an optimal browsing experience to your website visitors.', 'gutenverse')}</p>
                <p>{__('By significantly boosting loading speeds, we\'re confident that your visitors will enjoy enhanced interactions and an overall improved experience when navigating your website.', 'gutenverse')}</p>
            </div>
        </>
    );
};

export default V200;

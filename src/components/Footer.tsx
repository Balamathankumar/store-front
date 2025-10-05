import React from 'react';
import logoImg from '../../src/assets/image/image.png';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='container'>
          <div className='footer-grid'>
            {/* Company Info */}
            <div className='footer-section'>
              <div className='footer-logo'>
                <img
                  src={logoImg}
                  alt='Store Logo'
                  width={100}
                  height={100}
                  style={{ borderRadius: '8px' }}
                />
              </div>
              <p className='footer-description'>
                Your premium destination for authentic spices, nuts, herbs, and
                blends. We bring you the finest quality ingredients from around
                the world.
              </p>
              {/* <div className="footer-social">
                <button className="social-link" aria-label="Facebook" onClick={() => alert('Facebook page coming soon!')}>📘</button>
                <button className="social-link" aria-label="Instagram" onClick={() => alert('Instagram page coming soon!')}>📷</button>
                <button className="social-link" aria-label="Twitter" onClick={() => alert('Twitter page coming soon!')}>🐦</button>
                <button className="social-link" aria-label="YouTube" onClick={() => alert('YouTube channel coming soon!')}>📺</button>
              </div> */}
            </div>

            {/* Quick Links */}
            {/* <div className='footer-section'>
              <h4 className='footer-title'>Quick Links</h4>
              <ul className='footer-links'>
                <li>
                  <a href='/'>Home</a>
                </li>
                <li>
                  <a href='/?category=spices'>Spices</a>
                </li>
                <li>
                  <a href='/?category=nuts'>Nuts</a>
                </li>
                <li>
                  <a href='/?category=herbs'>Herbs</a>
                </li>
                <li>
                  <a href='/?category=seeds'>Seeds</a>
                </li>
                <li>
                  <a href='/?category=blends'>Blends</a>
                </li>
              </ul>
            </div> */}

            {/* Customer Service */}
            {/* <div className='footer-section'>
              <h4 className='footer-title'>Customer Service</h4>
              <ul className='footer-links'>
                <li>
                  <a href='#help'>Help Center</a>
                </li>
                <li>
                  <a href='#shipping'>Shipping Info</a>
                </li>
                <li>
                  <a href='#returns'>Returns & Exchanges</a>
                </li>
                <li>
                  <a href='#track'>Track Your Order</a>
                </li>
                <li>
                  <a href='#contact'>Contact Us</a>
                </li>
                <li>
                  <a href='#bulk'>Bulk Orders</a>
                </li>
              </ul>
            </div> */}

            {/* About */}
            {/* <div className='footer-section'>
              <h4 className='footer-title'>About SpiceX</h4>
              <ul className='footer-links'>
                <li>
                  <a href='#about'>Our Story</a>
                </li>
                <li>
                  <a href='#quality'>Quality Promise</a>
                </li>
                <li>
                  <a href='#sourcing'>Sourcing</a>
                </li>
                <li>
                  <a href='#careers'>Careers</a>
                </li>
                <li>
                  <a href='#press'>Press</a>
                </li>
                <li>
                  <a href='#sustainability'>Sustainability</a>
                </li>
              </ul>
            </div> */}

            {/* Contact Info */}
            <div
              className='footer-section'
              style={{ position: 'absolute', right: '40px', margin: '-28px 0' }}
            >
              <h4 className='footer-title'>Get in Touch</h4>
              <div className='footer-contact'>
                <div className='contact-item'>
                  <span className='contact-icon'>📞</span>
                  <div>
                    <p>Customer Service</p>
                    <a href='tel:+918000123456'>+91 7904774212</a>
                  </div>
                </div>
                <div className='contact-item'>
                  <span className='contact-icon'>📧</span>
                  <div>
                    <p>Email Us</p>
                    <a href='mailto:support@spicex.com'>
                      srisainutsandspices@gmail.com
                    </a>
                  </div>
                </div>
                <div className='contact-item'>
                  <span className='contact-icon'>📧</span>
                  <div>
                    <p>Address</p>
                    <p>
                      Door No 5/23, Kamarajar High Road, Muthamizh Nagar,
                      Pammal, Chennai - 600075
                    </p>
                    {/* <a href='mailto:support@spicex.com'>support@spicex.com</a> */}
                  </div>
                </div>
                <div className='contact-item'>
                  <span className='contact-icon'>🕒</span>
                  <div>
                    <p>Business Hours</p>
                    <p>Mon-Sat: 9AM-7PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            {/* <div className='footer-section'>
              <h4 className='footer-title'>Stay Updated</h4>
              <p className='newsletter-text'>
                Subscribe to get special offers, recipes, and new product
                updates.
              </p>
              <form
                className='newsletter-form'
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    'Thank you for subscribing! You will receive updates soon.'
                  );
                }}
              >
                <div className='newsletter-input-group'>
                  <input
                    type='email'
                    placeholder='Enter your email'
                    className='newsletter-input'
                    required
                  />
                  <button type='submit' className='newsletter-btn'>
                    Subscribe
                  </button>
                </div>
              </form>
              <div className='footer-features'>
                <div className='feature-item'>
                  <span>🚚</span>
                  <span>Free shipping over ₹1000</span>
                </div>
                <div className='feature-item'>
                  <span>🔒</span>
                  <span>Secure payments</span>
                </div>
                <div className='feature-item'>
                  <span>↩️</span>
                  <span>Easy returns</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='footer-bottom'>
        <div className='container'>
          <div className='footer-bottom-content'>
            <div className='footer-legal'>
              <p>&copy; 2025 SpiceX. All rights reserved.</p>
              <div className='footer-legal-links'>
                <a href='#privacy'>Privacy Policy</a>
                <span>•</span>
                <a href='#terms'>Terms of Service</a>
                <span>•</span>
                <a href='#cookies'>Cookie Policy</a>
              </div>
            </div>
            <div className='footer-payment'>
              <span>Accepted Payments:</span>
              <div className='payment-methods'>
                <span>💳</span>
                <span>🏧</span>
                <span>📱</span>
                <span>💰</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

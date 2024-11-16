'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import LoginForm from '../(auth)/login/LoginForm';
import LogoutButton from '../(auth)/logout/LogoutButton';
import RegisterForm from '../(auth)/register/RegisterForm';
import styles from '../styles/TopBar.module.scss';

export default function TopBar({ sessionToken, username }) {
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  // Open the modal when "Sign In" button is clicked
  const handleSignInClick = () => {
    setShowModal(true);
  };

  // Close the modal and reset the form state
  const closeModal = () => {
    setShowModal(false);
    setIsRegister(true);
  };

  // Toggle the profile dropdown menu
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Redirect to the profile page
  const handleProfileClick = () => {
    router.push(`/profile/${username}`);
  };

  return (
    <nav className={styles.topBar}>
      <div className={styles.logo}>FocusFlow</div>

      {/* Show profile menu if user is logged in */}
      {sessionToken ? (
        <div className={styles.profileMenu}>
          <button className={styles.profileButton} onClick={toggleDropdown}>
            Profile
          </button>
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <button
                className={styles.dropdownItem}
                onClick={handleProfileClick}
              >
                Profile Page
              </button>
              <LogoutButton className={styles.dropdownItem} />
            </div>
          )}
        </div>
      ) : (
        <button className={styles.profileButton} onClick={handleSignInClick}>
          Sign In
        </button>
      )}

      {/* Modal for Login/Register */}
      {showModal && (
        <div className={styles.modal}>
          <button onClick={closeModal} className={styles.closeButton}>
            ✖
          </button>
          {isRegister ? (
            <>
              <h2>Register</h2>
              <RegisterForm closeModal={closeModal} />
              <p>
                Already have an account?{' '}
                <button
                  className={styles.switchButton}
                  onClick={() => setIsRegister(false)}
                >
                  Log In
                </button>
              </p>
            </>
          ) : (
            <>
              <h2>Log In</h2>
              <LoginForm closeModal={closeModal} />
              <p>
                Don't have an account?{' '}
                <button
                  className={styles.switchButton}
                  onClick={() => setIsRegister(true)}
                >
                  Register
                </button>
              </p>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

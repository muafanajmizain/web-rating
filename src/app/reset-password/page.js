import React, { useState } from 'react';

export default function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    passwordBaru: '',
    konfirmasiPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.passwordBaru !== formData.konfirmasiPassword) {
      alert('Password tidak cocok!');
      return;
    }
    console.log('Password reset:', formData);
    alert('Password berhasil direset!');
  };

  return React.createElement('div', {
    className: 'min-h-screen flex items-center justify-center bg-gray-100 p-4'
  },
    React.createElement('div', {
      className: 'flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full'
    },
      // Bagian Kiri
      React.createElement('div', {
        className: 'bg-gradient-to-br from-blue-500 to-blue-600 p-12 md:w-1/2 flex flex-col justify-center items-start text-white relative overflow-hidden'
      },
        // Decorative circles
        React.createElement('div', {
          className: 'absolute top-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full'
        }),
        React.createElement('div', {
          className: 'absolute bottom-20 left-10 w-24 h-24 bg-white opacity-10 rounded-full'
        }),
        React.createElement('div', {
          className: 'absolute top-1/2 left-1/3 w-16 h-16 bg-white opacity-10 rounded-full'
        }),
        
        // Icon decorations
        React.createElement('div', {
          className: 'mb-8 flex gap-4'
        },
          React.createElement('div', {
            className: 'w-12 h-12 bg-white bg-opacity-20 rounded-lg'
          }),
          React.createElement('div', {
            className: 'w-8 h-8 bg-white bg-opacity-20 rounded-lg'
          }),
          React.createElement('div', {
            className: 'w-6 h-6 bg-white bg-opacity-20 rounded-full'
          })
        ),

        React.createElement('h1', {
          className: 'text-5xl font-bold mb-4 z-10'
        }, 'Ranking OnTheWeb'),
        
        React.createElement('p', {
          className: 'text-lg text-blue-100 z-10'
        }, 'Kontribusi Anda untuk Peningkatan Mutu Digital Sekolah'),

        // Bottom decoration
        React.createElement('div', {
          className: 'mt-12 flex items-center gap-4'
        },
          React.createElement('div', {
            className: 'w-16 h-16 bg-cyan-400 rounded-full opacity-70'
          }),
          React.createElement('div', {
            className: 'flex flex-col gap-2'
          },
            React.createElement('div', {
              className: 'w-3 h-3 bg-white opacity-50 rounded-full'
            }),
            React.createElement('div', {
              className: 'w-3 h-3 bg-white opacity-50 rounded-full'
            }),
            React.createElement('div', {
              className: 'w-3 h-3 bg-white opacity-50 rounded-full'
            })
          )
        )
      ),

      // Bagian Kanan - Form Reset Password
      React.createElement('div', {
        className: 'p-12 md:w-1/2 bg-gray-50 flex items-center justify-center'
      },
        React.createElement('div', {
          className: 'max-w-md w-full'
        },
          // Icon Globe
          React.createElement('div', {
            className: 'flex justify-center mb-6'
          },
            React.createElement('div', {
              className: 'w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center'
            },
              React.createElement('span', {
                className: 'text-white text-3xl'
              }, '🌐')
            )
          ),

          // Title
          React.createElement('h2', {
            className: 'text-2xl font-bold text-gray-800 text-center mb-8'
          }, 'Reset Password'),

          // Input Password Baru
          React.createElement('div', {
            className: 'mb-6'
          },
            React.createElement('label', {
              className: 'block text-gray-700 font-medium mb-2'
            }, 'Password Baru'),
            React.createElement('div', {
              className: 'relative'
            },
              React.createElement('span', {
                className: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              }, '🔒'),
              React.createElement('input', {
                type: 'password',
                name: 'passwordBaru',
                value: formData.passwordBaru,
                onChange: handleChange,
                placeholder: 'Masukan password baru',
                className: 'w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              })
            )
          ),

          // Input Konfirmasi Password
          React.createElement('div', {
            className: 'mb-6'
          },
            React.createElement('label', {
              className: 'block text-gray-700 font-medium mb-2'
            }, 'Konfirmasi Password'),
            React.createElement('div', {
              className: 'relative'
            },
              React.createElement('span', {
                className: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              }, '🔒'),
              React.createElement('input', {
                type: 'password',
                name: 'konfirmasiPassword',
                value: formData.konfirmasiPassword,
                onChange: handleChange,
                placeholder: 'Masukan Konfirmasi Password',
                className: 'w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              })
            )
          ),

          // Tombol Simpan
          React.createElement('button', {
            onClick: handleSubmit,
            className: 'w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold text-lg shadow-lg mb-4'
          }, 'Simpan'),

          // Text "or"
          React.createElement('div', {
            className: 'text-center text-gray-500 text-sm'
          }, 'or')
        )
      )
    )
  );
}
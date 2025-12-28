// src/app/register/pengelola/page.js

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPengelolaPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    npsn: '',
    whatsapp: '',
    email: '',
    jabatan: '',
    suratKuasa: null
  });

  const [validationErrors, setValidationErrors] = useState({
    npsn: '',
    whatsapp: '',
    email: ''
  });

  const validateNPSN = (value) => {
    if (!value) return '';
    if (!/^\d+$/.test(value)) {
      return 'NPSN harus berupa angka';
    }
    if (value.length !== 8) {
      return 'NPSN harus 8 digit';
    }
    return '';
  };

  const validateWhatsApp = (value) => {
    if (!value) return '';
    if (!/^\d+$/.test(value)) {
      return 'Nomor WhatsApp harus berupa angka';
    }
    return '';
  };

  const validateEmail = (value) => {
    if (!value) return '';
    if (!value.includes('@')) {
      return 'Email harus menggunakan @';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validasi real-time
    if (name === 'npsn') {
      setValidationErrors(prev => ({ ...prev, npsn: validateNPSN(value) }));
    } else if (name === 'whatsapp') {
      setValidationErrors(prev => ({ ...prev, whatsapp: validateWhatsApp(value) }));
    } else if (name === 'email') {
      setValidationErrors(prev => ({ ...prev, email: validateEmail(value) }));
    }
    
    if (showErrors) setShowErrors(false);
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, suratKuasa: e.target.files[0] }));
    if (showErrors) setShowErrors(false);
  };

  const isFormValid = () => {
    return formData.nama && 
           formData.npsn && 
           formData.whatsapp && 
           formData.email && 
           formData.jabatan && 
           formData.suratKuasa &&
           !validationErrors.npsn &&
           !validationErrors.whatsapp &&
           !validationErrors.email;
  };

  const handleSubmit = () => {
    // Validasi final semua field
    const npsnError = validateNPSN(formData.npsn);
    const whatsappError = validateWhatsApp(formData.whatsapp);
    const emailError = validateEmail(formData.email);
    
    setValidationErrors({
      npsn: npsnError,
      whatsapp: whatsappError,
      email: emailError
    });
    
    if (!isFormValid() || npsnError || whatsappError || emailError) {
      setShowErrors(true);
      alert('Mohon perbaiki data yang salah atau lengkapi semua data terlebih dahulu!');
      return;
    }
    
    console.log('Form submitted:', formData);
    setShowModal(true);
    
    // Auto redirect setelah 3 detik
    setTimeout(() => {
      router.push('/user');
    }, 3000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/user');
  };

  return React.createElement('div', {
    className: 'min-h-screen flex items-center justify-center bg-gray-100 p-4'
  },
    // Modal Pop Up
    showModal && React.createElement('div', {
      className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4',
      onClick: handleCloseModal
    },
      React.createElement('div', {
        className: 'bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all',
        onClick: (e) => e.stopPropagation()
      },
        // Icon Success
        React.createElement('div', {
          className: 'flex justify-center mb-6'
        },
          React.createElement('div', {
            className: 'w-20 h-20 bg-green-100 rounded-full flex items-center justify-center'
          },
            React.createElement('svg', {
              className: 'w-10 h-10 text-green-500',
              fill: 'none',
              stroke: 'currentColor',
              viewBox: '0 0 24 24'
            },
              React.createElement('path', {
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
                d: 'M5 13l4 4L19 7'
              })
            )
          )
        ),
        
        // Title
        React.createElement('h2', {
          className: 'text-2xl font-bold text-gray-900 text-center mb-4'
        }, 'Pendaftaran Berhasil!'),
        
        // Message
        React.createElement('p', {
          className: 'text-gray-600 text-center mb-6 leading-relaxed'
        }, 'Terima kasih telah mendaftar sebagai pengelola sekolah. Tim kami akan memverifikasi data Anda dan menghubungi Anda melalui kontak yang telah didaftarkan dalam waktu maksimal 2x24 jam.'),
        
        // Button
        React.createElement('button', {
          onClick: handleCloseModal,
          className: 'w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-lg'
        }, 'Kembali ke Beranda')
      )
    ),

    // Form Container
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

      // Bagian Kanan - Form
      React.createElement('div', {
        className: 'p-12 md:w-1/2 bg-gray-50'
      },
        React.createElement('div', {
          className: 'max-w-md mx-auto'
        },
          // Input Nama
          React.createElement('div', {
            className: 'mb-6'
          },
            React.createElement('label', {
              className: 'block text-gray-700 font-medium mb-2'
            }, 'Nama'),
            React.createElement('div', {
              className: 'relative'
            },
              React.createElement('span', {
                className: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              }, '👤'),
              React.createElement('input', {
                type: 'text',
                name: 'nama',
                value: formData.nama,
                onChange: handleChange,
                placeholder: 'Masukan nama lengkap anda',
                className: `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  showErrors && !formData.nama ? 'border-red-500' : 'border-gray-300'
                }`
              })
            )
          ),

          // Input NPSN
          React.createElement('div', {
            className: 'mb-6'
          },
            React.createElement('label', {
              className: 'block text-gray-700 font-medium mb-2'
            }, 'NPSN'),
            React.createElement('div', {
              className: 'relative'
            },
              React.createElement('span', {
                className: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              }, '🏫'),
              React.createElement('input', {
                type: 'text',
                name: 'npsn',
                value: formData.npsn,
                onChange: handleChange,
                placeholder: 'Masukan NPSN sekolah (8 digit)',
                maxLength: 8,
                className: `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  (showErrors && !formData.npsn) || validationErrors.npsn ? 'border-red-500' : 'border-gray-300'
                }`
              })
            ),
            validationErrors.npsn && React.createElement('p', {
              className: 'text-xs text-red-500 mt-1'
            }, validationErrors.npsn)
          ),

          // Input No WhatsApp
          React.createElement('div', {
            className: 'mb-6'
          },
            React.createElement('label', {
              className: 'block text-gray-700 font-medium mb-2'
            }, 'No WhatsApp'),
            React.createElement('div', {
              className: 'relative'
            },
              React.createElement('span', {
                className: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              }, '📱'),
              React.createElement('input', {
                type: 'tel',
                name: 'whatsapp',
                value: formData.whatsapp,
                onChange: handleChange,
                placeholder: 'Masukan no whatsapp (hanya angka)',
                className: `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  (showErrors && !formData.whatsapp) || validationErrors.whatsapp ? 'border-red-500' : 'border-gray-300'
                }`
              })
            ),
            validationErrors.whatsapp && React.createElement('p', {
              className: 'text-xs text-red-500 mt-1'
            }, validationErrors.whatsapp)
          ),

          // Input Email
          React.createElement('div', {
            className: 'mb-6'
          },
            React.createElement('label', {
              className: 'block text-gray-700 font-medium mb-2'
            }, 'Email'),
            React.createElement('div', {
              className: 'relative'
            },
              React.createElement('span', {
                className: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              }, '✉️'),
              React.createElement('input', {
                type: 'email',
                name: 'email',
                value: formData.email,
                onChange: handleChange,
                placeholder: 'Masukan email anda (harus ada @)',
                className: `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  (showErrors && !formData.email) || validationErrors.email ? 'border-red-500' : 'border-gray-300'
                }`
              })
            ),
            validationErrors.email && React.createElement('p', {
              className: 'text-xs text-red-500 mt-1'
            }, validationErrors.email)
          ),

          // Input Jabatan
          React.createElement('div', {
            className: 'mb-6'
          },
            React.createElement('label', {
              className: 'block text-gray-700 font-medium mb-2'
            }, 'Jabatan'),
            React.createElement('div', {
              className: 'relative'
            },
              React.createElement('span', {
                className: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              }, '💼'),
              React.createElement('input', {
                type: 'text',
                name: 'jabatan',
                value: formData.jabatan,
                onChange: handleChange,
                placeholder: 'Masukan jabatan anda',
                className: `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  showErrors && !formData.jabatan ? 'border-red-500' : 'border-gray-300'
                }`
              })
            )
          ),

          // Upload Surat Kuasa
          React.createElement('div', {
            className: 'mb-8'
          },
            React.createElement('label', {
              className: 'block text-gray-700 font-medium mb-2'
            }, 'Upload Surat Kuasa'),
            React.createElement('div', {
              className: `flex items-center gap-3 ${showErrors && !formData.suratKuasa ? 'mb-1' : ''}`
            },
              React.createElement('button', {
                type: 'button',
                onClick: () => document.getElementById('surat-kuasa-upload').click(),
                className: `px-6 py-3 rounded-lg transition-colors font-medium ${
                  showErrors && !formData.suratKuasa 
                    ? 'bg-red-100 text-red-600 border-2 border-red-500' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`
              }, 'Upload'),
              formData.suratKuasa && React.createElement('span', {
                className: 'text-sm text-gray-600 truncate max-w-xs'
              }, formData.suratKuasa.name)
            ),
            showErrors && !formData.suratKuasa && React.createElement('p', {
              className: 'text-xs text-red-500 mt-1'
            }, 'File Surat Kuasa wajib diupload'),
            React.createElement('input', {
              id: 'surat-kuasa-upload',
              type: 'file',
              accept: '.pdf,.doc,.docx',
              onChange: handleFileChange,
              className: 'hidden'
            })
          ),

          // Tombol Daftar
          React.createElement('button', {
            type: 'button',
            onClick: handleSubmit,
            disabled: !isFormValid(),
            className: `w-full py-3 rounded-lg transition-colors font-semibold text-lg shadow-lg ${
              isFormValid() 
                ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`
          }, 'Daftar')
        )
      )
    )
  );
}
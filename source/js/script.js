'use sctrict'

var callback = document.querySelector('.callback__element--call')
var overlay = document.querySelector('.overlay')
var modalClose = document.querySelector('.modal-callback__cross-button')
var modalName = document.querySelector('[name="modal-name"]')
var modalTel = document.querySelector('[name="modal-tel"]')
var modalText = document.querySelector('[name="modal-text"]')
var modalForm = document.querySelector('.modal-form')

var isStorageSupport = true
var storageName = ''
var storageMessage = ''

try {
  storageName = window.localStorage.getItem('name')
  storageMessage = window.localStorage.getItem('message')
} catch (err) {
  isStorageSupport = false
}

callback.addEventListener('click', function (evt) {
  evt.preventDefault()
  overlay.classList.add('overlay--open')
  modalName.focus()

  if (storageName) {
    modalName.value = storageName
  }

  if (window.localStorage.getItem('tel')) {
    modalTel.value = window.localStorage.getItem('tel')
  }

  if (storageMessage) {
    modalText.value = storageMessage
  }
})

modalClose.addEventListener('click', function (evt) {
  evt.preventDefault()
  overlay.classList.remove('overlay--open')
})

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault()
    if (overlay.classList.contains('overlay--open')) {
      overlay.classList.remove('overlay--open')
    }
  }
})

overlay.addEventListener('click', function (evt) {
  if (evt.target === overlay) {
    evt.preventDefault()
    overlay.classList.remove('overlay--open')
  }
})

modalForm.addEventListener('input', function (evt) {
  if (evt.target === modalTel) {
    modalTel.value = modalTel.value.replace(/[^0123456789+()]/g, '')

    if (modalTel.value.length === 6) {
      modalTel.value = modalTel.value + ')'
    }

    if (modalTel.value.length > 14) {
      modalTel.value = modalTel.value.slice(0, 14)
    }
  }

  if (isStorageSupport) {
    window.localStorage.setItem('name', modalName.value)
    window.localStorage.setItem('tel', modalTel.value)
    window.localStorage.setItem('message', modalText.value)
  }
})

modalTel.addEventListener('focus', function (evt) {
  if (!modalTel.value) {
    modalTel.value = '+7('
  }
})

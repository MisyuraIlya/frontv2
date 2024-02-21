import Swal from 'sweetalert2'

export const onSuccessAlert = (title: string, message: string) => {
  Swal.fire({
    title: title,
    text: message,
    timer: 3000,
    showConfirmButton: false,
    icon: 'success',
  })
}

export const onErrorAlert = (title: string, message: string) => {
  Swal.fire({
    title: title,
    text: message,
    timer: 3000,
    showConfirmButton: false,
    icon: 'error',
  })
}

export const onInfoAlert = (title: string, message: string) => {
  Swal.fire({
    title: title,
    text: message,
    timer: 3000,
    showConfirmButton: false,
    icon: 'info',
  })
}

export const onAsk = async (title: string, message: string) => {
  return Swal.fire({
    title: title,
    showCancelButton: true,
    confirmButtonColor: '#3B7A82',
    cancelButtonColor: '#959595',
    confirmButtonText: 'אישור',
    cancelButtonText: 'ביטול',
  }).then(function (res) {
    if (res.value) {
      return true
    } else {
      return false
    }
  })
}

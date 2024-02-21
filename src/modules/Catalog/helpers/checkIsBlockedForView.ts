import { onInfoAlert } from '../../../shared/MySweetAlert'
export const checkIsBlockedForView = (category: ICategory): boolean => {
  const isLogged = localStorage.user

  if (category.lvlNumber == 2 && !isLogged) {
    if (category.isBlockedForView) {
      onInfoAlert('כניסה למורשים בלבד', 'יש להתחבר עם שם משתמש וסיסמה')
      return true
    } else {
      return false
    }
  }

  if (category.lvlNumber == 3 && !isLogged) {
    if (category.parent?.isBlockedForView) {
      onInfoAlert('כניסה למורשים בלבד', 'יש להתחבר עם שם משתמש וסיסמה')
      return true
    } else {
      return false
    }
  }

  return false
}

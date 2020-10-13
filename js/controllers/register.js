import { register as apiRegister } from '../data.js'
import { showError, showInfo } from '../notification.js';

export default async function register() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        registerForm: await this.load('./templates/user/registerForm.hbs')
    }

    this.partial('./templates/user/register.hbs', this.app.userData);
}

export async function registerPost() {
     try {
        if (this.params.password !== this.params.repeatPassword) {
            throw new Error('Password don\'t match');
        }
        if (this.params.username.length < 3) {
            throw new Error('Username must be at least 3 characters long');
        }
        if (this.params.password.length < 6) {
            throw new Error ('Password must be at least 6 characters long');
        }
        const result = await apiRegister(this.params.username, this.params.password);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Successfully registered');
        this.redirect('#/login')
    } catch (err) {
        console.log(err);
        showError(err.message);
    }

}

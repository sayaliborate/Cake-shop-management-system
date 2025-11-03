import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddCakesService, Cake } from '../../add-cakes.service';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-add-cakes',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-cakes.component.html',
  styleUrl: './add-cakes.component.css'
})
export class AddCakesComponent implements OnInit{
//  cake: Partial<Cake> = {};

//   showCustomWeight: boolean = false;

//   selectedFile: File | null = null;
//   cakes: any[] = [];

//   constructor(private cakeService: AddCakesService) {}
//  ngOnInit(): void {
//     this.cakeService.getCakeList().subscribe({
//       next: (data) => {
//         console.log("retrived cakes",data);
        
//         this.cakes = data;
//       },
//       error: (error) => {
//         console.error('Error fetching cake list', error);
//       }
//     });
//   }

//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   onSubmit() {
//     if (!this.selectedFile) {
//       alert('Please select an image file.');
//       return;
//     }

//     const cakeData: Cake = {
//       name: this.cake.name!,
//       description: this.cake.description!,
//       price: this.cake.price!,
//       image: this.selectedFile
//     };

//     this.cakeService.uploadCake(cakeData).subscribe({
//       next: res => {
//         console.log('Cake uploaded successfully', res);
//         alert('Cake uploaded successfully!');
//       },
//       error: err => {
//         console.error('Upload error', err);
//         alert('Failed to upload cake');
//       }
//     });
//   }

cakes: Cake[] = [];
  cake: Partial<Cake> = {};
  selectedFile: File | null = null;
  showQR = false;
  selectedCakeForPayment: Cake | null = null;
qrData = '';        // your QR code data string
  showQRCode = false;  // <-- Track whether to show QR code or not
  showScanner = false;
selectedCake: Cake | null = null;

  constructor(private cakeService: AddCakesService) {}

  ngOnInit() {
    this.getCakes();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
 onPaymentOptionChange(option: string) {
  if (option === 'online') {
    this.showQRCode = true;
    this.qrData = 'your qr code data here'; // update the data dynamically
  } else {
    this.showQRCode = false;
  }
}
onOnlinePaymentClick(cake: Cake) {
  this.selectedCakeForPayment = cake;
  this.qrData = `upi://pay?pa=yourshop@upi&pn=CakeShop&am=${cake.price}&cu=INR`;
  this.showQRCode = true;  // 👈 Show QR code
  this.showScanner = false;
}
 onCashOnDeliveryClick() {
  this.showScanner = true;   // open dummy scanner for COD
  this.showQRCode = false;   // hide QR code if showing
}
closeScanner() {
  this.showScanner = false;  // close scanner modal
}
  onSubmit() {
    if (!this.cake.name || !this.cake.description || !this.cake.price || !this.selectedFile) {
      alert('Please fill all fields and select an image!');
      return;
    }

    const newCake: Cake = {
      name: this.cake.name,
      description: this.cake.description,
      price: this.cake.price,
      image: this.selectedFile
    };

    this.cakeService.uploadCake(newCake).subscribe({
      next: () => {
        alert('Cake added successfully!');
        this.cake = {};
        this.selectedFile = null;
        this.getCakes();
      },
      error: (err) => {
        alert('Error adding cake!');
        console.error(err);
      }
    });
  }

  getCakes() {
    this.cakeService.getCakeList().subscribe({
      next: (data) => {
        this.cakes = data;
      },
      error: (err) => {
        alert('Error fetching cakes!');
        console.error(err);
      }
    });
  }

 payOnline(cake: Cake) {
  this.selectedCakeForPayment = cake;
  this.qrData = `upi://pay?pa=yourshop@upi&pn=CakeShop&am=${cake.price}&cu=INR`;
  this.showQRCode = true;
  this.showScanner = false;
}
selectCakeForCOD(cake: Cake) {
  this.selectedCakeForPayment = cake;
  this.showScanner = true;
  this.showQRCode = false;
}

//  confirmPayment() {
//   if (!this.selectedCakeForPayment) return;

//   const orderData = {
//     cake_id: this.selectedCakeForPayment.id,
//     payment_method: 'Online',
//     payment_status: 'Completed',
//     amount: this.selectedCakeForPayment.price,
//   };

//   this.cakeService.saveOrder(orderData).subscribe({
//     next: () => {
//       alert('Payment confirmed and order saved! 🎉');
//       this.showQRCode = false;
//       this.selectedCakeForPayment = null;
//       this.getCakes();
//     },
//     error: (err) => {
//       alert('Error saving order.');
//       console.error(err);
//     }
//   });
// }


//   cashOnDelivery(cake: Cake) {
//     const paymentData = {
//       cake_id: cake.id,
//       method: 'COD'
//     };

//     this.cakeService.saveOrder(paymentData).subscribe({
//       next: () => {
//         alert('Order placed with COD ✅');
//       },
//       error: (err) => {
//         alert('Error saving COD order');
//         console.error(err);
//       }
//     });
//   }
// confirmPayment() {
//   if (!this.selectedCakeForPayment) return;

//   const orderData = {
//     cake_id: this.selectedCakeForPayment.id,
//     payment_method: 'Online',
//     payment_status: 'Completed',
//     amount: this.selectedCakeForPayment.price,
//   };

//   this.cakeService.saveOrder(orderData).subscribe({
//     next: () => {
//       alert('Payment confirmed and order saved! 🎉');
//       this.showQRCode = false;
//       this.selectedCakeForPayment = null;
//       this.getCakes();  // refresh cake list if needed
//     },
//     error: (err) => {
//       alert('Error saving order.');
//       console.error(err);
//     }
//   });
// }

}
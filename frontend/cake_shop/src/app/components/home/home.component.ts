import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLinkWithHref, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  videoUrl: SafeResourceUrl;
  @ViewChild('testimonialWrapper', { static: false }) testimonialWrapper!: ElementRef;
white: any;

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://youtube.com/shorts/QdEd9JCnzCc?si=QGSCxTLq6gAnS0K');
   
  }

  activeIndex: number = 0; // Initialize active index for tracking testimonials

  services = [
    {
      title: 'Bakery',
      description: 'We have all your favorite traditional bread, 7 days a week! You can choose from a variety of cookies, pastries, and cakes.',
      icon: 'assets/images/backery1.jpg'
    },
    {
      title: 'Cakes',
      description: 'We specialize in custom cakes for all occasions. Choose from a variety of designs to create the perfect cake for you.',
      icon: 'assets/images/cake.jpg'
    },
    {
      title: 'Fresh Juices',
      description: 'Choose from a variety of fruits and veggies to make your favorite juice. Enjoy fresh squeezed orange juice.',
      icon: 'assets/images/juice.jpg'
    },
    {
      title: 'Catering',
      description: 'We do catering for everything from weddings to business functions, offering high-quality service and taste.',
      icon: 'assets/images/c1.avif'
    },
    {
      title: 'Smile Truck',
      description: 'Our awesome team will be hitting the streets with delicious baked goods, ready to serve you on the go.',
      icon: 'assets/images/delevery.png'
    },
    {
      title: 'Weddings',
      description: 'From elegant wedding cakes to delicious gift treats, we make your special day even sweeter.',
      icon: 'assets/images/bread.jpg'
    }
  ];

  // third container
  testimonials = [
    {
      text: "We just wanted to thank you for the beautiful cake you created for our wedding. It was simply delicious and meticulously decorated.",
      name: "William Hence",
      role: "Business Owner",
      image: "assets/images/business-owner.jpg"
    },
    {
      text: "The best bakery I have ever visited! Their cakes and pastries are fresh and absolutely delicious.",
      name: "Sophia Anderson",
      role: "Event Planner",
      image: "assets/images/e.jpg"
    },
    {
      text: "Their catering services are outstanding! The food was amazing, and the team was very professional.",
      name: "David Smith",
      role: "Restaurant Owner",
      image: "assets/images/resto.jpg"
    }
  ];

  get currentTestimonial() {
    return this.testimonials[this.activeIndex];
  }

  setActive(index: number) {
    this.activeIndex = index;
    if (this.testimonialWrapper && this.testimonialWrapper.nativeElement) {
      const scrollAmount = index * 300; // Adjust based on card width
      this.testimonialWrapper.nativeElement.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  }
  
  scrollLeft() {
    if (this.activeIndex > 0) {
      this.setActive(this.activeIndex - 1);
    }
  }
  
  scrollRight() {
    if (this.activeIndex < this.testimonials.length - 1) {
      this.setActive(this.activeIndex + 1);
    }
  }
  

}

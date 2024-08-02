/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDemo]',
  standalone: true,
})
export class DemoDirective {
  constructor(private el: ElementRef) {}
  @HostListener('click')
  imageChange() {
    const src: any = this.el.nativeElement.src;
    const prev: any = document.getElementById('preview');
    prev.src = src;
    const imageSlie: any = document.getElementsByClassName('img-slide');
    for (let i = 0; i < imageSlie.length; i++) {
      imageSlie[i].classList.remove('active');
    }
    this.el.nativeElement.parentElement.class.add('active');
  }
}

import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testzoom';
  @ViewChild('imageContainer') imageContainer!: ElementRef;

  currentImage: string = '';
  zoomLevel: number = 100;
  rotationAngle: number = 0;
  imagePositionX: number = 0;
  imagePositionY: number = 0;
  isDragging: boolean = false;
  dragStartX: number = 0;
  dragStartY: number = 0;

  images: string[] = [
    'https://cdn.pixabay.com/photo/2022/12/19/13/50/oak-7665740_640.jpg',
    'https://cdn.pixabay.com/photo/2022/12/19/13/50/oak-7665740_640.jpg',
    'https://cdn.pixabay.com/photo/2023/05/19/05/33/boats-8003723_640.jpg'
    // Add more image paths here
  ];

  selectImage(image: string) {
    this.currentImage = image;
    this.resetImageTransformation();
  }

  zoomIn() {
    if (this.zoomLevel < 200) {
      this.zoomLevel += 10;
    }
  }

  zoomOut() {
    if (this.zoomLevel > 10) {
      this.zoomLevel -= 10;
    }
  }

  rotateClockwise() {
    this.rotationAngle += 90;
  }

  rotateCounterClockwise() {
    this.rotationAngle -= 90;
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const offsetX = event.clientX - this.dragStartX;
      const offsetY = event.clientY - this.dragStartY;

      this.imagePositionX += offsetX;
      this.imagePositionY += offsetY;

      this.dragStartX = event.clientX;
      this.dragStartY = event.clientY;
    }
  }

  onDragStart(event: MouseEvent) {
    event.preventDefault();
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
  }

  resetImageTransformation() {
    this.zoomLevel = 100;
    this.rotationAngle = 0;
    this.imagePositionX = 0;
    this.imagePositionY = 0;
  }

  
onMouseWheel(event: WheelEvent) {
  event.preventDefault();
  
  const deltaY = event.deltaY;
  const zoomFactor = 0.1;

  if (deltaY > 0) {
    this.zoomOut();
  } else if (deltaY < 0) {
    this.zoomIn();
  }
}

}





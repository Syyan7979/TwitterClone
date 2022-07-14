import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hashtag'
})
export class HashtagPipe implements PipeTransform {

  transform(text: string) {
    let text1;
    if (text.indexOf('#') !== -1) {
      text1 = text + ' ';
      const matches = text1.match(/#(?![# ]).*? /g);
      if (matches) {
        for (let i = 0; i < matches.length; i++) {
          text1 = text1.replace(matches[i],'<span class="highlighted">' + matches[i] + '</span>');
        }
      }
    } else {
      text1 = text;
    }
    return text1;
  }

}

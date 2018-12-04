import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RuleConverterService {

  constructor() { }

  /* 
   * Attention: the actual ruleset is in reverse order
   * (meaning 1 is at index 0 and 128 is at index 7) 
   */ 
  decimalToBinary(number: number): number [] {
        const binary = number.toString(2);
        const binaryRuleset = [];
        console.log(number);
        for (let i = 0; i < binary.length; i++) {
            binaryRuleset.unshift(parseInt(binary.charAt(i), 10));
        }
        while (binaryRuleset.length < 8) {
            binaryRuleset.push(0);
        }
        return  binaryRuleset;
  }

  binaryToDecimal(rule: number[]): number {
      const inverse = rule.reverse();
      let binary = '';
      rule.forEach(element => binary = binary + element);
      return parseInt(binary, 2);
  }
}

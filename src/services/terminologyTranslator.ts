interface TermMapping {
  old: string[]
  new: string[]
}

class TerminologyTranslator {
  private mappings: TermMapping[] = [
    {
      old: ['bouwvergunning', 'bouwwerk'],
      new: ['bouwactiviteit', 'bouwactiviteit (omgevingsplan)']
    },
    {
      old: ['sloopvergunning', 'slopen'],
      new: ['sloopactiviteit', 'sloopwerkzaamheden']
    },
    {
      old: ['kapvergunning', 'bomenkap', 'kappen'],
      new: ['omgevingsplanactiviteit (kap)', 'kap']
    },
    {
      old: ['aanlegvergunning', 'aanleg'],
      new: ['aanlegactiviteit', 'omgevingsplanactiviteit']
    },
    {
      old: ['monumentenvergunning'],
      new: ['rijksmonumentenactiviteit', 'monument']
    },
    {
      old: ['omgevingsvergunning'],
      new: ['omgevingsplanactiviteit', 'bouwactiviteit', 'sloopactiviteit']
    }
  ]

  getSuggestions(query: string): string[] {
    const lowerQuery = query.toLowerCase()
    const suggestions: string[] = []

    // Find matching terms
    for (const mapping of this.mappings) {
      // Check old terms
      for (const oldTerm of mapping.old) {
        if (oldTerm.includes(lowerQuery)) {
          suggestions.push(oldTerm)
          // Add corresponding new terms
          mapping.new.forEach(newTerm => {
            if (!suggestions.includes(newTerm)) {
              suggestions.push(newTerm)
            }
          })
        }
      }

      // Check new terms
      for (const newTerm of mapping.new) {
        if (newTerm.includes(lowerQuery) && !suggestions.includes(newTerm)) {
          suggestions.push(newTerm)
          // Add corresponding old terms
          mapping.old.forEach(oldTerm => {
            if (!suggestions.includes(oldTerm)) {
              suggestions.push(oldTerm)
            }
          })
        }
      }
    }

    return suggestions.slice(0, 8) // Limit to 8 suggestions
  }

  translateToNew(oldTerm: string): string[] {
    const lowerTerm = oldTerm.toLowerCase()
    for (const mapping of this.mappings) {
      if (mapping.old.some(term => term === lowerTerm)) {
        return mapping.new
      }
    }
    return [oldTerm] // Return original if no mapping found
  }

  translateToOld(newTerm: string): string[] {
    const lowerTerm = newTerm.toLowerCase()
    for (const mapping of this.mappings) {
      if (mapping.new.some(term => term === lowerTerm)) {
        return mapping.old
      }
    }
    return [newTerm] // Return original if no mapping found
  }

  isOldTerm(term: string): boolean {
    const lowerTerm = term.toLowerCase()
    return this.mappings.some(mapping => 
      mapping.old.some(oldTerm => oldTerm === lowerTerm)
    )
  }

  isNewTerm(term: string): boolean {
    const lowerTerm = term.toLowerCase()
    return this.mappings.some(mapping => 
      mapping.new.some(newTerm => newTerm === lowerTerm)
    )
  }

  getSearchQuery(userInput: string): string {
    const terms = [userInput]
    
    // Add translated terms
    const newTerms = this.translateToNew(userInput)
    const oldTerms = this.translateToOld(userInput)
    
    terms.push(...newTerms, ...oldTerms)
    
    // Create OR query for search
    return terms
      .filter((term, index, self) => self.indexOf(term) === index) // Remove duplicates
      .map(term => `"${term}"`)
      .join(' OR ')
  }
}

export const terminologyTranslator = new TerminologyTranslator()
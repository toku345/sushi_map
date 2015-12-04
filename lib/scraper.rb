require 'open-uri'
require 'nokogiri'

require 'pry' if ENV['DEBUG']

class Scraper
  class << self
    def restaurants_info_in(url)
      html, charset = get_html(url)
      scrape_name_and_address(html, charset)
    end

    private

    def get_html(url)
      charset = nil
      html = open(url) do |f|
        charset = f.charset
        f.read
      end
      [html, charset]
    end

    def scrape_name_and_address(html, charset)
      doc = Nokogiri::HTML.parse(html, nil, charset)
      doc.xpath('//div[contains(@id, "restaurant_")]').map do |node|
        node.children[1].text.strip =~ /(.*)＠/
        name = $1
        node.children[5].children[7].text.strip =~ /(.*)\(.*\)/
        address = $1
        [name, address]
      end
    end
  end
end


# for DEBUG
if __FILE__ == $0
  restaurants_info = Scraper.restaurants_info_in("http://retty.me/area/PRE13/ARE2/SUB204/LCAT2/CAT30/topic/178/")
  pp restaurants_info
end

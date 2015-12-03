require 'open-uri'

# require 'pry' # for DEBUG

class Scraper
  class << self
    def address_geo_data_in(url)
      html, _charset = get_html(url)
      # address_list = scan_address(html)     
      # get_geo_data(address_list)
      scan_address(html)
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

    def scan_address(html)
      html.scan(/<dt>住所<\/dt>\n<dd>(.*)\(.*\)<\/dd>/).flatten
    end

    # def get_geo_data(address_list)     
    #   address_list
    # end
  end
end


# for DEBUG
if __FILE__ == $0
  puts Scraper.address_geo_data_in("http://retty.me/area/PRE13/ARE2/SUB204/LCAT2/CAT30/topic/178/")[0, 5]
end

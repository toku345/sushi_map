require 'sinatra'

require 'haml'
require 'sass'

require File.expand_path('../lib/scraper.rb', __FILE__)

set :public_folder, File.dirname(__FILE__) + '/public'

get '/' do
  @address_list =
    Scraper.address_geo_data_in("http://retty.me/area/PRE13/ARE2/SUB204/LCAT2/CAT30/topic/178/")[0, 10] # 10を超えると OVER_LIMIT_QUERYになるっぽい... orz
  haml :index
end

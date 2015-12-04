require 'sinatra'

require 'haml'
require 'sass'

require File.expand_path('../lib/scraper.rb', __FILE__)

set :public_folder, File.dirname(__FILE__) + '/public'

# とりあえず日曜日に必要なページを決め打つ
URL = "http://retty.me/area/PRE13/ARE2/SUB204/LCAT2/CAT30/topic/178/"

get '/' do
  @restaurants =
    Scraper.restaurants_info_in(URL)[0, 10] # 10を超えると OVER_LIMIT_QUERYになるっぽい... orz
  haml :index
end

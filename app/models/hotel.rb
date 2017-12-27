class Hotel
  
  SUPPLIER_URLS = { 0 => 'https://api.myjson.com/bins/2tlb8', 1 => 'https://api.myjson.com/bins/42lok', 2 => 'https://api.myjson.com/bins/15ktg' }
  
  def self.search(params)
    key = Digest::MD5.hexdigest(params.to_json)
    results = $cache.read(key)
    return results unless results.blank?
    checkin = params[:checkin].to_date
    checkout = params[:checkout].to_date
    destination = params[:destination]
    guests = params[:guests]
    suppliers = params[:suppliers].split(",").reject(&:empty?).collect(&:to_i)
    suppliers = SUPPLIER_URLS.keys if suppliers.blank?
    rates = []
    suppliers.each do |supplier_id|
      supplier_response = fetch_from_supplier(supplier_id)
      rates << supplier_response.keys.collect{|x| {id: x, price: supplier_response[x], supplier: "supplier#{supplier_id + 1}"}}
    end
    rates = rates.flatten!
    results = calculate_cheapest(rates).to_json
    $cache.write(key, results,  :expires_in => 5.minutes)
    results
  end
  
  #private
  
  def self.fetch_from_supplier(supplier_id)
    JSON.parse(HTTParty.get(SUPPLIER_URLS[supplier_id]).body)
  end
  
  def self.calculate_cheapest(rates)
    rates.group_by {|item| item[:id]}.values.collect{|x| x.min_by{|y| y[:price]}}.flatten
  end
end

class CreatePreventions < ActiveRecord::Migration[6.1]
  def change
    create_table :preventions, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.jsonb 'data', default: {}
    end
  end
end

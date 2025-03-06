using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EHL.Common.Models
{
	public class Category : Base
	{
		public string Name { get; set; }
	}
	public class SubCategory : Category
	{
		public int CategoryId { get; set; }
	}
	public class Eqpt : SubCategory
	{
		public int SubCategoryId { get; set; }
	}
}

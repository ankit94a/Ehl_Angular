﻿using EHL.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EHL.DB.Interfaces
{
	public interface IAttributeDB
	{
		public bool AddWing(Wing wing);
		public List<Wing> GetWing();
		public bool AddCategory(Category category);
		public List<Category> GetCategories(long wingId);
		public bool DeactivateCategory(long Id);
		public bool AddSubCategory(SubCategory subCategory);
		public List<SubCategory> GetSubCategories(long categoryId);
		public bool DeactivateSubCategory(long Id);
		public bool AddEqpt(Eqpt eqpt);
		public List<Eqpt> GetEqpt(long categoryId,long subCategoryId);
		public bool DeactivateEqpt(long Id);
	}
}
